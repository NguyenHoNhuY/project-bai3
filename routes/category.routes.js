const router = require("express").Router();
const categoryModel = require("../models/category.model");

router.get("/", async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.render("categories/list", { categories: categories });
  } catch (e) {
    console.log(e);``
    res.redirect("/");
  }
});

router.get("/add", async (req, res) => {
  try {
    const categories = new categoryModel();
    res.render("categories/add", { categories: categories });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.post("/add", async (req, res) => {
  try {
    const categoriesNew = new categoryModel({
      name: req.body.name,
    });
    await categoriesNew.save();
    res.redirect("/category");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
router.get("/edit/:id", async (req, res) => {
  try {
    const categories = await categoryModel.findById(req.params.id);
    res.render("categories/edit", { categories: categories });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
router.put("/edit/:id", async (req, res) => {
  try {
    let categories = await categoryModel.findById(req.params.id);
    categories.name = req.body.name;
    await categories.save();
    res.redirect("/category"); //* redirect gọi lại url
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let categories = await categoryModel.findByIdAndDelete(req.params.id);
    res.redirect("/category");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

module.exports = router;
