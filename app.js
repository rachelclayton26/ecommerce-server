const Express =require('express');
const { ecommerceController } = require('./controllers');
const app = Express();

const controllers = require("./controllers");

////TEST ROUTES FOR SERVER SET UP///

app.use('/test', (req, res) => {
    res.send("This is a message from the test endpoint on the server!")
});

//////////////////////////////////////////////////

app.use('/ecommerce', controllers.ecommerceController);

app.use('/about', controllers.ecommerceController);



app.listen(3000, () => {
    console.log(`[Server]: App is listening on 3000.`);
});