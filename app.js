require('dotenv').config();
const Express =require('express');
const app = Express();

const dbConnection = require("./db");
    //^import db 

app.use(Express.json());  
const controllers = require("./controllers");
                 app.use('/test', (req, res) => {
  res.send("This is a message from the test endpoint from your friend, the test server.")
});

    //Import controllers as a bundle, <controllers>, from from index.js:                    
    

    //call app.use(), which accepts two params.
    //First, create base URL /shop, then use dotnotation to get shopController out of that object.
app.use('/shop', controllers.shopController);
    //all routes under shopController will now be sub routres.
dbConnection.authenticate()
    //using the db variable from our import, we access the sequelize instance and its methods from the db file. 
    //we also use authenticate() method, which returns a promise. 
    .then(() => dbConnection.sync())
        //we use a promise resolver to access the returned promise and call upon the sync() method, which does what it says on the tin with the database.
    .then(() => { 
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
            //we print a message to confirm the sync() method worked and we are connected with the database.
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });
             //we print a message to show us that the sync() method failed and why we are NOT connected with the database or if there is any other kind of error. We get these error codes from db - thanks, sequelize!






=======
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


//////// Connecting Server to DataBase (PgAdmin)  ///////////////
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

