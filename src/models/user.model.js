const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    referrel: {
      type: String,
    },
    role:{
        type:String,
        enum:["user","deliveryBoy","retailer"],
        default:"user",
    },
    product: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      ],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
