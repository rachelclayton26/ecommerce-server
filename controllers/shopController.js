const Express = require('express');
const router = (Express.Router);
const { ShopModel } = require('../models');
/*
shop/test endpoint 
*/
router.get('/test', (req, res) => {
    res.send("[Server]: shopping shopping shopping!")
});

// router.get('/about', (req, res) => {
//     res.send("A section for 'Our Story'")
// });

/*
shop/
*/
router.post("/shopAdd", async (req, res) => {
    ShopModel.create({
        title: "Item Title",
        description: "A modern, luxurious test description that is perfect for your home or home away from home.",
        price: 99,
        inventory: 1,
        media: null
    })
})

module.exports = router;