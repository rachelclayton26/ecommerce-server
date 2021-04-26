const router = require('express').Router();
const {UserModel} = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

/////// REGISTER USER - POST /////////////
router.post("/register", async(req, res) => {
    const {firstName, lastName, email, password} = req.body.user;
    try{
        const User = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 15),
            //Alec
            //isAdmin is the other thing this model should account for, but we ideally shouldn't expose that to the front end. My hacky way to do this is something like this, followed by hiding the element from the user. Once the database is updated by one of us to indicate that there is an admin user, they could then see and use their UI elements. 
            isAdmin

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

/////////////// USER LOGIN //////////////

router.post('/login', async(req, res) => {
    const {email, password } = req.body.user;

    try{
        let loginUser = await UserModel.findOne({
         where: {
            email: email,
            // password: password, but via protected route
        },
        //Alec - with Admin check:
        /*
        try {
            let loginUser = await UserModel.findOne({
         where: {
            email: email,
            password: password, 
            isAdmin
            console.log(user) 
            } catch (e) {
            console.log('Error - could not match you to a user. Please try again.')
            }
            */

    try{
        let loginAdminUser = await UserModel.findOne({
            where: {
            email: email,
        }
    });
    if(loginUser){

        let passwordComparison = await bcrypt.compare(password, loginUser.password);

        if (passwordComparison){

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