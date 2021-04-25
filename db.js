const Sequelize = require('sequelize');
//^import the sequelize package and create an instance of sequelize for use with the Sequelize variable
//use the constructor to make a new sequelize object (for our database). Constructor takes in a string, which holds the URI for connecting to our db.
const sequelize = 
// new Sequelize("postgres://postgres:codingg1l!@localhost:5432/BlueBadgeTeamProject");

module.exports = sequelize;