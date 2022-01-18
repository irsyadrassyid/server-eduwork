const { Schema, model } = require("mongoose");

const deleveryAddressSchema = Schema(
  {
    name: {
      type: String,
      maxlength: [255, "Panjang alamat maksimal 255 karakter"],
      requered: [true, "Alamat harus diisi"],
    },
    kelurahan: {
      type: String,
      maxlength: [255, "Panjang kelurahan maksimal 255 karakter"],
      requered: [true, "kelurahan harus diisi"],
    },
    kabupaten: {
      type: String,
      maxlength: [255, "Panjang kabupaten maksimal 255 karakter"],
      requered: [true, "kabupaten harus diisi"],
    },
    kecamatan: {
      type: String,
      maxlength: [255, "Panjang kecamatan maksimal 255 karakter"],
      requered: [true, "kecamatan harus diisi"],
    },
    provinsi: {
      type: String,
      maxlength: [255, "Panjang provinsi maksimal 255 karakter"],
      requered: [true, "provinsi harus diisi"],
    },
    detail: {
      type: String,
      maxlength: [1000, "Panjang detail maksimal 1000 karakter"],
      requered: [true, "detail harus diisi"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("DeleveryAddress", deleveryAddressSchema);
