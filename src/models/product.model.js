const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;
