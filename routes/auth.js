const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt"); // lib to encrypt data
const saltRounds = 10;


//////////// S I G N U P ///////////

// .get() route ==> to display the signup form to users
router.get("/signup", async (req, res, next) => {
  res.render("auth/signup", { titlePage: "SignUp" });
});


// .post() route ==> finish the signup and redirect to the homepage
router.post('/signup', (req, res, next) => {

  const { email, password } = req.body;

  UserModel
    .findOne({ email: email })
    .then(found => {
      if (found) {
        res.render("auth/login", { message: "Email already registered" });
      } else {
        bcrypt
          .genSalt(saltRounds)
          .then(salt => bcrypt.hash(password, salt))
          .then(hashedPassword => {
            return UserModel.create({
              email,
              passwordHash: hashedPassword
            });
          })
          .then(userFromDB => {
            console.log('Newly created user is: ', userFromDB);
            req.session.currentUser = userFromDB;
            res.redirect('/user/profile');
          })

          .catch(error => next(error));
      }
    })
    .catch(error => next(error));

});


//////////// L O G I N ///////////


// .get() route ==> to display the login form to users
router.get('/login', (req, res) => {
  //
  res.render('auth/login', { titlePage: "Login" })
});

// .post() login route ==> to process form data
router.post('/login', (req, res, next) => {

  // console.log('SESSION ', req.session);


  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('auth/login', {
      message: 'Please enter both, email and password to login.'
    });
    return;
  }

  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { message: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcrypt.compareSync(password, user.passwordHash)) {

        /////   SAVE THE USER IN THE SESSION //////
        req.session.currentUser = user;
        console.log('SESSION => ', req.session);
        console.log(req.session.currentUser);
        res.redirect("/user/profile")
        //res.render('profile', { user });


      } else {
        res.render('auth/login', { message: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});



//////////// S I G N O U T ///////////

router.get("/logout", async (req, res) => {

  console.log("logout", req.session.currentUser);
  req.session.destroy(function (err) {
    res.redirect("/auth/login");
  });
});

module.exports = router;
