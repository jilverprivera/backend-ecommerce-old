const router = require("express").Router();
const {
    TokenJWTValidate,
    authAdmin,
    validateFields,
} = require("../middleware");
const { check } = require("express-validator");

const { emailExist } = require("../helpers/emailExits");
const userController = require("../controllers/userController");
const authController = require("../controllers/auth");

router.post(
    "/register",
    check("name", "name is required.").not().isEmpty(),
    check("password", "Password must be at least 6 characters.").isLength({
        min: 6,
    }),
    check("email", "Email is incorrect.").isEmail(),
    check("email").custom(emailExist),
    validateFields,
    authController.register
);

router.post(
    "/create_user",
    check("name", "name is required.").not().isEmpty(),
    check("password", "Password must be at least 6 characters.").isLength({
        min: 6,
    }),
    check("email", "Email is incorrect.").isEmail(),
    check("email").custom(emailExist),
    TokenJWTValidate,
    authAdmin,
    validateFields,
    authController.create_user
);

router.post(
    "/login",
    check("email", "The email is required.").isEmail(),
    check("password", "The password is required.").not().isEmpty(),
    validateFields,
    authController.login
);

router.get("/get", TokenJWTValidate, authAdmin, userController.getAllUsers);

router.put(
    "/update/:id",
    TokenJWTValidate,
    authAdmin,
    userController.updateUserById
);
router.delete(
    "/delete/:id",
    TokenJWTValidate,
    authAdmin,
    userController.deleteUserFromDatabase
);

router.get("/renew", TokenJWTValidate, userController.reValidateToken);

router.get("/info", TokenJWTValidate, userController.getUserById);

router.patch("/add_cart", TokenJWTValidate, userController.addToCart);
router.patch("/wish_list", TokenJWTValidate, userController.addToWishList);

router.get("/history", TokenJWTValidate, userController.historyPayment);

module.exports = router;
