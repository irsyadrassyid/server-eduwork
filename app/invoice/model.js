const { Schema, model } = require("mongoose");

const invoiceSchema = Schema(
  {
    sub_total: {
      type: Number,
      required: [true, "sub total harus diisi"],
    },
    delevery_fee: {
      type: Number,
      required: [true, "delevery fee harus diisi"],
    },
    delevery_address: {
      provinsi: { type: String, required: [true, "harus diisi"] },
      kabupaten: { type: String, required: [true, "harus diisi"] },
      kecamatan: { type: String, required: [true, "harus diisi"] },
      kelurahan: { type: String, required: [true, "harus diisi"] },
      detail: { type: String, required: [true, "harus diisi"] },
    },
    total: {
      type: Number,
      required: [true, "total harus diisi"],
    },
    payment_status: {
      type: String,
      enum: ["waiting_payment", "paid"],
      default: "waiting_payment",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestapms: true }
);

module.exports = model("Invoice", invoiceSchema);
