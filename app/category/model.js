const { model, Schema } = require("mongoose");

const categorySchema = Schema({
  name: {
    type: String,
    minLength: [3, "Panjang nama kategori minimal 3 karakter"],
    maxLength: [20, "panjang nama kategori maksimal 20"],
    required: [true, "Nama kategori harus diisi"],
  },
});

module.exports = model("Category", categorySchema);
