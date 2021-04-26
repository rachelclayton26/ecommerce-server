const Express = require('express');
const router = Express.Router();
let validateJWT = require('../middleware/validate-jwt');
const { LogModel } = require('../models');

router.get('/practice', validateJWT, (req, res) => {
    res.send("Hey! I'm practicing making routes!")
});

router.get('/about', (req, res) => {
    res.send("We can write 'Our Story'here!")
});

/*
===============================
        Get All Items
===============================
*/

//Rachel

router.get('/', validateJWT, async (req, res) => {
    const {title, description, price, inventory, media} = req.body.shopItem;
    const {id} = req.user;
    const shopEntry = {
        title,
        description,
        price,
        inventory,
        media,
        owner: id
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
