const router = require("express").Router();
const { police_check } = require("../../middleware");

const categoryController = require("./controller");
// -- create ---
router.post(
  "/categories",
  police_check("create", "Category"),
  categoryController.store
);
// -- read --
router.get("/categories", categoryController.index);
// -- update --
router.put(
  "/categories/:id",
  police_check("update", "Category"),
  categoryController.update
);
// -- detele --
router.delete(
  "/categories/:id",
  police_check("delete", "Category"),
  categoryController.destroy
);

module.exports = router;
