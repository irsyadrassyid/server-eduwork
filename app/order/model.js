const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Invoice = require("../invoice/model");

const orderSchema = Schema(
  {
    status: {
      type: String,
      enum: ["waiting_payment", "proccessing", "in_delevery", "delevered"],
      default: "waiting_payment",
    },
    delevery_fee: {
      type: Number,
      default: 0,
    },
    delevery_address: {
      provinsi: { type: String, required: [true, "harus diisi"] },
      kabupaten: { type: String, required: [true, "harus diisi"] },
      kecamatan: { type: String, required: [true, "harus diisi"] },
      kelurahan: { type: String, required: [true, "harus diisi"] },
      detail: { type: String },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    order_item: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
  },
  { timestamps: true }
);

orderSchema.plugin(AutoIncrement, { inc_field: "order_number" });
orderSchema.virtual("items_count").get(function () {
  return this.order_item.reduce((total, item) => total + parseInt(item.qty), 0);
});
orderSchema.post("save", async function () {
  let sub_total = this.order_item.reduce(
    (total, item) => (total += item.price * item.qty),
    0
  );
  let invoice = new Invoice({
    user: this.user,
    order: this._id,
    sub_total: sub_total,
    delevery_fee: parseInt(this.delevery_fee),
    total: parseInt(sub_total + this.delevery_fee),
    delevery_address: this.delevery_address,
  });
  await invoice.save();
});

module.exports = model("Order", orderSchema);
