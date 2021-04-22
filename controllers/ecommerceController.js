const Express = require('express');
const router = Express.Router();

router.get('/practice', (req, res) => {
    res.send("I'm practicing making routes!")
});

router.get('/about', (req, res) => {
    res.send("A section for 'Our Story'")
});

module.exports = router;