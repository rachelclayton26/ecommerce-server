require('dotenv').config();
const Express =require('express');
const app = Express();
const dbConnection = require('./db');

app.use(Express.json());   ///////////MUST go above any routes - tells the app we want to use json in our request///////

const controllers = require('./controllers');

////// Test Route to Make Sure Server Connected to Postman /////////
app.use('/test', (req, res)=> {
    res.send("This is a message from the test route!")
});

//////// Controller Routes ////////////
app.use('/user', controllers.userController);

app.use(require('./middleware/validate-jwt'));   ///<--- validate sessions
app.use('/shop', controllers.shopController);


////// Connecting Server to DataBase (PgAdmin)  ///////////////
dbConnection.authenticate()
.then(() =>  dbConnection.sync())
.then(() => {
    app.listen(3000, () => {
        console.log('[Server]: App is listening on 3000.');
});
})
.catch((err)=> {
    console.log(`[Server]: Server crashed. Error = ${err}`);
});


// const Express = require("express");
// const app = Express();

// app.use('/test', (req, res) => {
//     res.semd("this is a test route")
// });

// app.listen(3000, () => {
//     console.log('[Server]: App is listening on 3000.');
// });