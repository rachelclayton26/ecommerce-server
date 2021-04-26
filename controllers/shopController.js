const Express = require('express');
const router = Express.Router();
let validateJWT = require('../middleware/validate-jwt');
const { LogModel } = require('../models');

//Alec
/*
====================
practice route
====================
*/

router.get('/practice', validateJWT, (req, res) => {
    res.send("Hey! I'm practicing making routes!")
});

//Alec
/* 
====================
Get ALL SHOP ITEMS - main view
====================
*/
router.get("/shop", async (req, res) => {
    try {
      const all = await ShopModel.findAll();
      res.status(200).json(entries);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
//Alec
/* 
====================
Get SHOP ITEM - single item detail view
====================
*/
router.get("/:title", async (req, res) => {
    try {
      const itemDetail = await ShopModel.findOne({
        where: {
          title: req.params.title,
          //maybe we add an event listener to get the :id once the client side can be connected 
        },
      });
  
      res.status(200).json({
        message: "Got it!",
        locatedPie,
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to retrieve the item: ${err}`,
      });
    }
  });

/*
====================
about route
====================
*/

router.get('/about', (req, res) => {
    res.send("We can write 'Our Story'here!")
});
<<<<<<< HEAD
=======

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
>>>>>>> b97431cde40d539c9da5b177e0842a8c63c20ef8
