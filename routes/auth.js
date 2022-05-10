const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");

const bcrypt = require('bcrypt');

//REGISTER

authRouter.post("/register", async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
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
