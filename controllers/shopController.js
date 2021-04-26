const Express = require('express');
const router = Express.Router();
let validateJWT = require('../middleware/validate-jwt');
const { ShopItemModel } = require('../models');

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
router.get("/", async (req, res) => {
    try {
      const products = await ShopItemModel.findAll();
      res.status(200).json(products);
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
      const itemDetail = await ShopItemModel.findOne({
        where: {
          title: req.params.title,
          //maybe we add an event listener to get the :id once the client side can be connected 
        },
      });
  
      res.status(200).json({
        message: "Got it!",
        itemDetail,
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to retrieve the item: ${err}`,
      });
    }
  });

module.exports = router;