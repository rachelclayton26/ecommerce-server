const Express =require('express');
const app = Express();
const dbConnection = require("./db");

                 // app.use('/test', (req, res) => {
                 //     res.send("This is a message from the test endpoint from your friend, the test server.")
                    // });

//Import controllers as a bundle, <controllers>, from from index.js:                    
const controllers = require("./controllers");
//call app.use(), which accepts two params.
//First, create base URL /shop, then use dotnotation to get shopController out of that object.
app.use('/shop', controllers.shopController);
//all routes under shopController will now be sub routres.
dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => { 
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });


/*
--------------------------------------------------
EXISTING CODE PARKING LOT - put stuff you don't understand or code you need to discuss down here
==================================================
*/


// ////TEST ROUTES FOR SERVER SET UP///



// //////////////////////////////////////////////////



// app.use('/about', controllers.ecommerceController);


