const router = require("express").Router();
const { TokenJWTValidate, authAdmin } = require("../middleware");

const imagesController = require("../controllers/imagesController");

router.post(
  "/upload",
  TokenJWTValidate,
  authAdmin,
  imagesController.uploadImage
);
router.post(
  "/destroy",
  TokenJWTValidate,
  authAdmin,
  imagesController.deleteImage
);

module.exports = router;
