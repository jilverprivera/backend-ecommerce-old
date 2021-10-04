const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: Object, required: true },
    cart: { type: Array, required: true },
    complete: {type: Boolean, default: false},
    send: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payments", paymentSchema);
