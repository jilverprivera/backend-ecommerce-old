const router = require("express").Router();

const { TokenJWTValidate, authAdmin } = require("../middleware");

const categoryController = require("../controllers/categoryController");

router.route("/categories").get(categoryController.getCategories);

router
    .route("/category")
    .post(TokenJWTValidate, authAdmin, categoryController.createCategory);
router
    .route("/category/:id")
    .get(TokenJWTValidate, categoryController.getCategoryById)
    .put(TokenJWTValidate, authAdmin, categoryController.updateCategoryById)
    .delete(TokenJWTValidate, authAdmin, categoryController.deleteCategoryById);

module.exports = router;
