const { Schema, model } = require("mongoose");

const cartItemSchema = Schema({
  name: {
    type: String,
    minlength: [5, "Panjang nama Makanan minimal 5 karakter"],
    required: [true, "name must filled"],
  },
  qty: {
    type: Number,
    min: [1, "minimal 1 "],
    required: [true, "Harus diisi"],
  },
  price: {
    type: Number,
    default: 0,
  },
  image_url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = model("CartItem", cartItemSchema);
