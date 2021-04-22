const Express = require('express');
const router = Express.Router();

router.get('/practice', (req, res) => {
    res.send("Hey! I'm practicing making routes!")
});

router.get('/about', (req, res) => {
    res.send("We can write 'Our Story'here!")
});

module.exports = router;