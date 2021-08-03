const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "bánh tráng",
      required: true,
    },
  },
  { timestamps: true }//* hiện thời gian add và update dữ liệu
); 
module.exports = mongoose.model("category", categorySchema);
