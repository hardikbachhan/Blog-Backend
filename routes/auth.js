const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");

const bcrypt = require('bcrypt');

//REGISTER

authRouter.post("/register", async (req, res) => {
    try {
        // generating password hash.
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

authRouter.post("/login", async (req, res) => {
    try {
        // find if user with given credentials exist
        const user = await User.findOne({ username: req.body.username })

        // redirect to register page if no user found
        if (!user) {
            res.status(400).json({ error: "Wrong Credentials!" });
            // res.redirect("/api/auth/register");
            return;
        }

        // validate user data sent with saved data - password
        const validated = await bcrypt.compare(req.body.password, user.password);

        // wrong credentials sent
        if (!validated) {
            res.status(400).json({ error: "Wrong Credentials!" });
            return;
        }

        const { password, ...otherDetails } = user._doc;

        res.status(200).json({user: otherDetails, validation: validated})

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = authRouter;
