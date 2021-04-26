const router = require('express').Router();
const {AdminModel} = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
let validateJWTAdmin = require('../middleware/validate-jwt-admin');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');


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

        let token = jwt.sign({id: Admin.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        
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

    try{
        let loginUser = await AdminModel.findOne({
         where: {
            email: email,
        },
    });
    if(loginUser){

        let passwordComparison = await bcrypt.compare(password, loginUser.password);

        if (passwordComparison){

        let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

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

/*
===============================
    Admin Shop Item Create
===============================
*/

//Rachel

router.post('/create', async (req, res) => {
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
    ShopItemModel.create(shopEntry)
    
});
module.exports = router;

/*
===============================
        Update a Shop Item
===============================
*/

//Rachel

router.put("/:id", validateJWTAdmin, async(req, res) => {
    const {title, description, price, inventory, media, category} = req.body.shopItem;
    const shopId = req.params.id;
    const adminId = req.user.id;

    const query = {
            where: { 
                id: shopId,
                owner: adminId
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
    const ownerId = req.user.id;
    const shopId = req.params.id;

    try{
    const query = {
            where: { 
                id: shopId,
                owner: ownerId
             }
        };
        
        await LogModel.destroy(query);
            res.status(200).json({message: "Product Removed"});
        } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;