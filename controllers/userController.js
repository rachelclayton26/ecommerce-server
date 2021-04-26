const router = require('express').Router();
const {UserModel} = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

//////// REGISTER USER - POST (JESS) /////////////
router.post("/register", async(req, res) => {
    const {firstName, lastName, email, password} = req.body.user;
    try{
        //// minimum password length requirement - not working yet ////
        if(
            !password.length >= 5
        ) {
            res.status(400).json({
                message: "Password must be at least 5 characters long"
            });
            return;
        }

        const User = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 15),
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        
    res.status(201).json({
        message: "User successfully registered",
        user: User,
        sessionToken: token
    });
} catch (err) {
    if (err instanceof UniqueConstraintError){
        res.status(409).json({
            message: "Email already in use",
        });
    } else {
    res.status(500).json({
        message: "Failed to register user"
    });
}
}
});

/////////////// USER LOGIN (JESS) //////////////

router.post('/login', async(req, res) => {
    const {email, passwordhash } = req.body.user;

    try{
        let loginUser = await UserModel.findOne({
         where: {
            email: email,
        },
    });
    if(loginUser){

        let passwordhashComparison = await bcrypt.compare(passwordhash, loginUser.passwordhash);

        if (passwordhashComparison){

        let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

        res.status(200).json({
            user: loginUser,
            message: "User successfully logged in!",
            sessionToken: token
    }); 
    } else {
    res.status(401).json({
        message: "Incorrect email or password"
    })
}
    } else {
        res.status(401).json({
            message: "Incorrect email or password"
        });
    }
    } catch (error) {
    res.status(500).json({
        message: "Failed to log user in"
    })
}
});


module.exports = router;