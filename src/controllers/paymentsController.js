const { User, Products, Payments } = require("../models");

const paymentController = {
  // <----------- GET ALL PAYMENTS ------------>
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.status(200).json({ payments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // <----------- CREATE A NEW PAYMENT ------------>
  createPayment: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("name, email");
      if (!user) {
        return res.status(400).json({ msg: "User doesn't exist on DB" });
      }
      const { cart, address, paymentID } = req.body;
      const { _id, name, email } = req.user;
      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        address,
        paymentID,
      });
      cart.filter((item) => {
        return sold(item._id, item.quantity, item.stock, item.sold);
      });

      await newPayment.save();
      res.status(202).json({ newPayment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
// <----------- UPDATING A PRODUCT SOLD ------------>
const sold = async (id, quantity, stock, oldSold) => {
  await Products.findByIdAndUpdate({ _id: id }, { sold: quantity + oldSold });
  await Products.findByIdAndUpdate({ _id: id }, { stock: stock - quantity });
};

module.exports = paymentController;
