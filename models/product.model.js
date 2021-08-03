const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "bánh mì",
    },
    info: {
      type: String,
      default: "rau củ quả sạch",
    },
    price: {
      type: Number,
      default: 200000,
    },
    quantity: {
      type: Number,
      default: 10,
    },
    category: {//! category là thuộc tính của product vs kiểu dữ liệu tham chiếu là 1 object 
      type: mongoose.Schema.Types.ObjectId,
      ref: "category", //! kiểu dữ liệu được tham chiếu qua bảng category
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);
