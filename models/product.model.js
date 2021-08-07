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
    category: {
      //! category là thuộc tính của product vs kiểu dữ liệu tham chiếu là 1 object
      type: mongoose.Schema.Types.ObjectId,
      ref: "category", //! kiểu dữ liệu được tham chiếu qua bảng category
    },
    imageType: {
      type: String,
    },
    imageData: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);
//! tạo kiểu dữ liệu ảo bằng virtual
productSchema.virtual("imageSrc").get(function () {
  if (this.imageData != null && this.imageType != null) {
    return `data:${
      this.imageType
    };charset=utf-8;base64,${this.imageData.toString("base64")}`;
  }
});

module.exports = mongoose.model("product", productSchema);
