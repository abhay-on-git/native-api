const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema(
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
        default:"retailer",
    }
  },
  { timestamps: true }
);

const retailer = mongoose.model("retailer", retailerSchema);

module.exports = retailer;
