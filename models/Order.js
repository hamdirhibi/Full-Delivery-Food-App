const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  quantities: [
    {
      type: Number,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    require: true,
  },
  total: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    require: true,
  },
  deleveryDate: {
    type: Date,
    require: true,
  },
  paymentMethod: {
    type: String,
    require: true,
  },
  freeSpace: {
    type: String,
  },
  weight: {
    type: Number,
    require: true,
  },
  orderAddress: {
    type: String,
    require: true,
  },
  view: {
    type: Boolean,
    require: true,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
