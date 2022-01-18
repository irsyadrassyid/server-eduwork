const router = require("express").Router();
const { police_check } = require("../../middleware");

const tagsController = require("./controller");
// -- create ---
router.post("/tags", police_check("create", "Tag"), tagsController.store);
// -- read --
router.get("/tags", tagsController.index);
// -- update --
router.put("/tags/:id", police_check("update", "Tag"), tagsController.update);
// -- detele --
router.delete(
  "/tags/:id",
  police_check("delete", "Tag"),
  tagsController.destroy
);

module.exports = router;
