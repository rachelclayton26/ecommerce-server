require('dotenv').config();
const Express =require('express');
const app = Express();
const dbConnection = require('./db');
const middleware = require('./middleware');
const controllers = require('./controllers');
const { use } = require('./controllers/shopController');

app.use(require('./middleware/headers'));
app.use(middleware.CORS);

app.use(Express.json());   ///////////MUST go above any routes - tells the app we want to use json in our request///////



////// Test Route to Make Sure Server Connected to Postman /////////
app.use('/test', (req, res)=> {
    res.send("This is a message from the test route!")
});

//////// Controller Routes ////////////
app.use('/user', controllers.userController);
app.use(require('./middleware/validate-jwt-admin'));
app.use('/open_sesame', controllers.adminController);  //admin route
app.use(require('./middleware/validate-jwt'));   ///<--- validate sessions
app.use('/shop', controllers.shopController);

////// Connecting Server to DataBase (PgAdmin)  ///////////////
dbConnection.authenticate()
    .then(() => dbConnection.sync())   //{force:true} to drop table (delete all DB data)
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })

.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
});
