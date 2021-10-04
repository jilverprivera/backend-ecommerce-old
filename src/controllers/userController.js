// const { response } = require('express');
const { User, Payments } = require("../models");

const { jwtGenerate } = require("../helpers/jwtGenerate");
const jwt = require("jsonwebtoken");

const userController = {
    // <---------------- GET ALL USERS ------------------>
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json({ users });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // <---------------- GET USER INFORMATION WHILE TOKEN IS VALID ------------------>
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user)
                return res.status(400).json({ msg: "User doesn't exist." });

            res.json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // <---------------- CHANGE USER STATE ------------------>
    updateUserById: async (req, res) => {
        try {
            const { state } = req.body;
            await User.findByIdAndUpdate({ _id: req.params.id }, { state });
            return res.status(200).json({ msg: `state changed to : ${state}` });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // <---------------- DELETE USER INFORMATION FROM MONGO DB ------------------>
    deleteUserFromDatabase: async (req, res) => {
        try {
            await User.findByIdAndRemove(req.params.id);
            res.status(200).json({
                msg: "User deleted from database sucessfully",
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // <---------------- ADD ITEMS TO USER CART------------------>
    addToCart: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user)
                return res.status(400).json({ msg: "User doesn't exist." });

            await User.findByIdAndUpdate(
                { _id: req.user.id },
                {
                    cart: req.body.cart,
                }
            );

            return res.json({ msg: "Added to cart" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    addToWishList: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user)
                return res.status(400).json({ msg: "User doesn't exist." });
            await User.findByIdAndUpdate(
                { _id: req.user.id },
                {
                    wish: req.body.wish,
                }
            );
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // <---------------- GET THE PAYMENTS INFORMATION OF THE USER ------------------>
    historyPayment: async (req, res) => {
        try {
            const history = await Payments.find({ user_id: req.user.id });

            res.status(200).json({ history });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // <---------------- VERIFY IF TOKEN IS VALID AND GENERATE OTHER ------------------>
    reValidateToken: async (req, res) => {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ msg: " No token" });
        }
        try {
            const { uid } = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET_SEED
            );
            const newToken = await jwtGenerate(uid);
            res.json({
                newToken,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = userController;
