const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");

//REGISTER

authRouter.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
        });

        const user = await newUser.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

//LOGIN

module.exports = authRouter;
