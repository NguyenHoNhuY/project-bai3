const router = require("express").Router();
const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");

router.get("/", async (req, res) => {
  try {
    let cart = [];
    let total=0
    if (req.session.cart) {
      cart = req.session.cart.items;
      total = req.session.cart.totalPrice;
    }
    res.render("carts/cart", { cart: cart, total: total });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.get("/add/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    let items_old = [];
    let total_old=0
    if (req.session.cart) {
      items_old = req.session.cart.items;
      total_old = req.session.cart.totalPrice;
    }
    const cart = new cartModel(items_old,total_old);
    cart.add(product, req.params.id, product.imageSrc, product.price);
    req.session.cart = cart;
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let items_old = [];
    let total_old=0
    if (req.session.cart) {
      items_old = req.session.cart.items;
      total_old = req.session.cart.totalPrice;
    }
    const cart = new cartModel(items_old,total_old);
    cart.delete(req.params.id);
    req.session.cart = cart;
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
router.get("/increase/:id", async (req, res) => {
  try {
    let items_old = [];
    let total_old=0
    if (req.session.cart) {
      items_old = req.session.cart.items;
      total_old = req.session.cart.totalPrice;
    }
    const cart = new cartModel(items_old,total_old);
    cart.increase(req.params.id);
    req.session.cart = cart;
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
router.get("/reduce/:id", async (req, res) => {
  try {
    let items_old = [];
    let total_old=0
    if (req.session.cart) {
      items_old = req.session.cart.items;
      total_old = req.session.cart.totalPrice;
    }
    const cart = new cartModel(items_old,total_old);
    cart.reduce(req.params.id);
    req.session.cart = cart;
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
module.exports = router;
