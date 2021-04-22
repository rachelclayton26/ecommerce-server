const router = require('express').Router();
const {UserModel} = require('../models');

router.post("/register", async(req, res) => {
    const {firstName, lastName, email, password} = req.body.user;

    await UserModel.create({
        firstName,
        lastName,
        email,
        password
    });
    res.status(201).json({
        message: "User successfully register",
        user: User
    });
})

module.exports = router;