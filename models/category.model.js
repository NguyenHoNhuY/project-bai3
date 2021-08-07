const mongoose = require("mongoose");
const productModel = require("./product.model");
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "bánh tráng",
      required: true,
    },
  },
  { timestamps: true } //* hiện thời gian add và update dữ liệu
);
categorySchema.pre("findOneAndDelete", async function (next) {//!hàm kiểm tra trước khi thực hiện hàm remove
  try {
    const product = await productModel.find({ category: this.getQuery() });//* category là tên thuộc tính của 1 product this.id là giá trị 
    if (product.length > 0) {
      next(new Error("Không xóa được"));
    }
  } catch (e) {
    next();
  }
});
module.exports = mongoose.model("category", categorySchema);
