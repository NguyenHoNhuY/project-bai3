const express = require("express");
const app = express();
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index.routes");
const productRouter = require('./routes/product.routes')
const categoryRouter = require("./routes/category.routes");
const methodOverride = require('method-override')


app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))


const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/bai3", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Kết nối database thành công");
  } catch (e) {
    console.log(e);
    console.log("Kết nối database thất bại");
  }
};

connect();

app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);

app.listen(3000);
