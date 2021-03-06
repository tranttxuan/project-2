// Wants to insert many in the reinforcement-sesh database
require("dotenv").config();
require("./../configs/mongo");
const mongoose = require("mongoose");
const UserModel = require("./../models/User");


const users = [
  {
        firstName: "Beer",
        lastName: "Admin",
        isAdult: true,
        email: "admin@beer.com",
        role: "admin",
  },
  {
      firstName: "John",
      lastName: "Doe",
      isAdult: true,
      email: "johndoe@gmail.com",
      role: "user",

  },
  

];

// empty the db
UserModel.deleteMany()
  .then(async () => {
    const insertedUsers = await UserModel.insertMany(users);
    console.log(`ok : ${insertedUsers.length} users inserted`);
  })
  .then(()=>   mongoose.disconnect())
  .catch((err) => {
    console.log(err);
  });