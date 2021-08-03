const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/another-route", (req, res) => {
  // router code here
});

module.exports = router;
