const { Schema, model } = require("mongoose");

const orderItemSchema = Schema({
  name: {
    type: String,
    minlength: [5, "Panjang name makanan minimal 5 karakter"],
    required: [true, "harus diisi"],
  },
  price: {
    type: Number,
    required: [true, "harus diisi"],
  },
  qty: {
    type: Number,
    required: [true, "harus diisi"],
    min: [1, "Panjan kuantitas minimal 1"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
});

module.exports = model("OrderItem", orderItemSchema);
