const Express = require('express');
const router = Express.Router();
let validateJWT = require('../middleware/validate-jwt');

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
