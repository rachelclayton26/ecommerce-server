const Express = require('express');
const router = Express.Router();
let validateJWT = require('../middleware/validate-jwt');

router.get('/practice', validateJWT, (req, res) => {
    res.send("Hey! I'm practicing making routes!")
});

router.get('/about', (req, res) => {
    res.send("We can write 'Our Story'here!")
});

module.exports = router;