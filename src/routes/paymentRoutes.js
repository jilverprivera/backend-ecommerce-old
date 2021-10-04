const router = require("express").Router();
const { TokenJWTValidate, authAdmin } = require("../middleware");
const paymentController = require("../controllers/paymentsController");

router.route("/payment")
  .get(TokenJWTValidate, authAdmin, paymentController.getPayments)
  .post(TokenJWTValidate, paymentController.createPayment);

module.exports = router;
