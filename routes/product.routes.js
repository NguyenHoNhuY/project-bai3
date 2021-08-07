const router = require("express").Router();
const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find().populate("category", ["name"]); //!tham chiếu đến thuộc tính category lấy name
    res.render("products/list", { products: products });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
router.get("/add", async (req, res) => {
  try {
    const product = new productModel();
    const categories = await categoryModel.find();
    res.render("products/add", { product: product, categories: categories });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
router.post("/add", async (req, res) => {
  try {
    const product = new productModel({
      name: req.body.name,
      info: req.body.info,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
    });

    if (req.body.image) {
      const imageEncode = JSON.parse(req.body.image);
      product.imageType = imageEncode.type;
      product.imageData = new Buffer.from(imageEncode.data, "base64");
    }

    await product.save();
    res.redirect("/product");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
router.get("/edit/:id", async (req, res) => {
  try {
    const products = await productModel.findById(req.params.id);
    const categories = await categoryModel.find();
    res.render("products/edit", { product: products, categories: categories });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
router.put("/edit/:id", async (req, res) => {
  try {
    let product = await productModel.findById(req.params.id);
    product.name = req.body.name;
    product.info = req.body.info;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.category = req.body.category;
    if (req.body.image) {
      const imageEncode = JSON.parse(req.body.image);
      product.imageType = imageEncode.type;
      product.imageData = new Buffer.from(imageEncode.data, "base64");
    }
    await product.save();
    res.redirect("/product");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    let product = await productModel.findByIdAndDelete(req.params.id);
    res.redirect("/product");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
module.exports = router;
