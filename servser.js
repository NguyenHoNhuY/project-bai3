const express = require("express");
const app = express();
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");

const indexRouter = require("./routes/index.routes");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/category.routes");
const cartRouter = require("./routes/cart.routes");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:  { maxAge: 60*60*1000}
}))

const connect = async () => {
  try {
    await mongoose.connect(process.env.STR_CONNECT, {
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
app.use("/cart", cartRouter);

app.listen(process.env.PORT || 3000);
