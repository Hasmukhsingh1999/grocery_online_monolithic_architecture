const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    banner: String,
    type: String,
    unit: Number,
    price: Number,
    available: Boolean,
    supplier: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
