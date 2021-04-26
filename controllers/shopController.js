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
    Admin Shop Item Create
===============================
*/

//Rachel

router.post('/newitem', validateJWT, async (req, res) => {
    const {description, definition, result} = req.body.shopItem;
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

/*
===============================
        Update a Shop Item
===============================
*/

//Rachel

router.put("/:id", validateJWT, async(req, res) => {
    const {description, definition, result} = req.body.log;
    const logId = req.params.id;
    const userId = req.user.id;

    const query = {
            where: { 
                id: logId,
                owner: userId
             }
        };
        
        const updatedLog = {
            description: description,
            definition: definition,
            result: result
        };

        try {
            const update = await LogModel.update(updatedLog, query);
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
router.delete("/:id", validateJWT, async(req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try{
    const query = {
            where: { 
                id: logId,
                owner: ownerId
             }
        };
        
        await LogModel.destroy(query);
            res.status(200).json({message: "Log Entry Removed"});
        } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;

// router.post('/', validateJWT, async (req, res) => {
//     const {description, definition, result} = req.body.log;
//     const {id} = req.user;
//     const logEntry = {
//         description,
//         definition,
//         result,
//         owner: id
//     }
//     try {
//         const newLog = await LogModel.create(logEntry);
//         res.status(200).json(newLog);
//     } catch (err) {
//         res.status(500).json({error: err});
//     }
//     LogModel.create(logEntry)
    
// });
// module.exports = router;