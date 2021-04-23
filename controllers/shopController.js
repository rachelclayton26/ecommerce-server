const Express = require('express');
const router = Express.Router();

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




module.exports = router;