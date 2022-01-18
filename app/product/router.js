const router = require("express").Router();
const multer = require("multer");
const os = require("os");
const { police_check } = require("../../middleware");

const productController = require("./controller");
// -- create ---
router.post(
  "/products",
  multer({ dest: os.tmpdir() }).single("image"),
  police_check("create", "Product"),
  productController.store
);

// -- read --
router.get("/products", productController.index);

// -- update --
router.put(
  "/products/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  police_check("update", "Product"),
  productController.update
);
// -- detele --
router.delete(
  "/products/:id",
  police_check("delete", "Product"),
  productController.destroy
);

module.exports = router;
