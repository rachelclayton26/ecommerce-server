const router = require('express').Router();
const {AdminModel} = require('../models');
const {ShopItemModel} = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
let validateJWTAdmin = require('../middleware/validate-jwt-admin');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

//Line 2 and 3 are examples of where we are importing a models required by the admin controller. If you look to line  21, you can see that we are using the AdminModel to grab the properites expected my that model and require them in the "/register" data imput. This is important because we need to validate that all required properties are included and allows the server to recognize what has been entered, check it against the rquired data type, and enter it correcly in the database table. 

/*
===============================
         Admin Create
===============================
*/

router.post("/register", async(req, res) => {
    const {firstName, lastName, email, password} = req.body.admin;
    try{
        const Admin = await AdminModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 15),
        });
        
        const token = jwt.sign({ id: Admin.id }, process.env.JWT_SECRET);

    res.status(201).json({
        message: "Admin successfully registered",
        admin: Admin,
        sessionToken: token
    });
} catch (err) {
    if (err instanceof UniqueConstraintError){
        res.status(409).json({
            message: "Email already in use",
        });
    } else {
    res.status(500).json({
        message: "Failed to register admin"
    });
}
}
});


//Rachel

/*
===============================
         Admin Login
===============================
*/

//Rachel

router.post('/aladdin', async(req, res) => {
    const {email, password } = req.body.admin;
    // console.log(email, password)
    try{
        let loginUser = await AdminModel.findOne({
         where: {
            email: email,
        },
    });
    if(loginUser){

        let passwordComparison = await bcrypt.compare(password, loginUser.password);

        const token = jwt.sign({ id: Admin.id }, process.env.JWT_SECRET);

        if (passwordComparison){

        res.status(200).json({
            admin: loginUser,
            message: "Admin successfully logged in!",
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

//Token Creation: Line 72 is where a token is created. The variable is declaired as "token" and then initalized. It uses the depenancy "jsonwebtoken" which we installed earlier. The jwt.sign method takes in the admin:id created and the JTW_SECRET imported from the .env file. It uses the "jsonwebtoken" algorithms(?) to create a token which will give this admin acess to protected routes like "/create." 

/*
===============================
    Admin Shop Item Create
===============================
*/

//Rachel

router.post('/create', validateJWTAdmin, async (req, res) => {
    // console.log("create item")
    const {title, description, price, inventory, media, category} = req.body.shopItem;
    // const {id} = req.admin;
    const shopEntry = {
        title,
        description,
        price,
        inventory,
        media,
        category,
        // owner: id
    }
    try {
        const newShopItem = await ShopItemModel.create(shopEntry);
        res.status(200).json(newShopItem);
    } catch (err) {
        res.status(500).json({error: err});
    }
    
});

//Validate-session: Line 106 contains a requirement of validateJWTAdmin. This checks the sessionToken created upon login, extracts the id and session from the payload, and verifies that this user has access to the given route. Here, it checks if the user trying to create a shop item is an admin with valid credentials.

/*
===============================
        Update a Shop Item
===============================
*/

//Rachel

router.put("/:id", validateJWTAdmin, async(req, res) => {
    const {title, description, price, inventory, media, category} = req.body.shopItem;
    const shopId = req.params.id;

    const query = {
            where: { 
                id: shopId,
             }
        };
        
        const updatedProduct = {
            title, 
            description, 
            price, 
            inventory, 
            media, 
            category
        };

        try {
            const update = await ShopItemModel.update(updatedProduct, query);
            res.status(200).json(update);
        } catch (err) {
        res.status(500).json({error: err});
    }
});

/*
===============================
       Delete a Shop Item
===============================
*/

//Rachel

router.delete("/:id", validateJWTAdmin, async(req, res) => {
    const shopId = req.params.id;

    try{
    const query = {
            where: { 
                id: shopId,
             }
        };
        
        await ShopItemModel.destroy(query);
            res.status(200).json({message: "Product Removed"});
        } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;