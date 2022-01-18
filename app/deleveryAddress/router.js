const router = require("express").Router();
const { police_check } = require("../../middleware");

const DeleveryAddressRouter = require("./controller");
// -- create ---
router.post(
  "/address",
  police_check("create", "DeleveryAddress"),
  DeleveryAddressRouter.store
);
// -- read --
router.get("/address", DeleveryAddressRouter.index);
// -- update --
router.put("/address/:id", DeleveryAddressRouter.update);
// -- detele --
router.delete("/address/:id", DeleveryAddressRouter.destroy);

module.exports = router;
