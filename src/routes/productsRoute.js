const router = require("express").Router();
const { check } = require("express-validator");

const { validateFields, TokenJWTValidate, authAdmin } = require("../middleware");

const productController = require("../controllers/productController");
const { existCategoryById } = require("../helpers/databaseValidators");

router.route("/products").get(productController.getProducts).post(
  TokenJWTValidate,
  authAdmin,
  check("product_id", "Product_id is required.").not().isEmpty(),
  check("name", "Name is required.").not().isEmpty(),
  check("price", "Price is required.").not().isEmpty(),
  check("description", "Description is required.").not().isEmpty(),
  check("category", "This ID is not a Mongo ID.").isMongoId(),
  check("category").custom(existCategoryById),
  validateFields,
  productController.createProduct
);

router
  .route("/product/:id")
  .get(TokenJWTValidate, authAdmin, productController.getProductById)
  .put(TokenJWTValidate, authAdmin, productController.updateProductById)
  .delete(TokenJWTValidate, authAdmin, productController.deleteProductById);

module.exports = router;
