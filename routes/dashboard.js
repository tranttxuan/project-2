var express = require("express");
var router = express.Router();
const BeerModel = require("./../models/Product");
const CartModel = require("./../models/Cart");
const fileUploader = require("./../configs/cloudinary");
const PendingModel = require("../models/PendingOrder");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");

router.use(protectAdminRoute);

// GET to show all the products
router.get("/", async (req, res, next) => {
  const products = await BeerModel.find();
  res.render("dashboard/products", { products, scripts: ["products"], titlePage: "Products" });
});

// GET to manage all the products
router.get("/products-manage", async (req, res, next) => {
  try {
    const products = await BeerModel.find();
    let pending = await PendingModel.find()
      .populate({ path: "cartId.productId", model: "Beer", select: ['name', 'price'] })
      .populate("user")
    res.render("dashboard/products-manage", { products, pending, scripts: ["products-manage"], titlePage: "Manage" });
  } catch (err) {
    next(err);
  }
});

// GET to add new the products
router.get("/product-add", (req, res, next) => {
  try {
    res.render("dashboard/product-add", { title: "Add" });
  } catch (err) {
    next(err);
  }
});

// GET to post products
router.post("/product-add", fileUploader.single('image'), async (req, res, next) => {
  const newBeer = { ...req.body };
  if (!req.file) newBeer.image = undefined;
  else newBeer.image = req.file.path;
  try {
    await BeerModel.create(newBeer);
    console.log("lala")
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

// GET to edit the products
router.get("/product-edit/:id", async (req, res, next) => {
  const product = await BeerModel.findById(req.params.id);
  // console.log(product)
  res.render("dashboard/product-edit", { product, titlePage: "Edit" });
});

// GET to post the edit products
router.post("/product-edit/:id", fileUploader.single('image'), async (req, res, next) => {
  const newBeer = { ...req.body };
  if (req.file) { newBeer.image = req.file.path };
  try {
    await BeerModel.findByIdAndUpdate(req.params.id, newBeer, { new: true });
    res.redirect("/dashboard/products-manage");
  } catch (err) {
    next(err);
  }
});

// GET to delete the product
router.get("/product-delete/:id", async (req, res, next) => {
  try {
    console.log("beeer");
    await BeerModel.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard/products-manage");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
