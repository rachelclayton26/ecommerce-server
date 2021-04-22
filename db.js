const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Elevenfifty@localhost:5432/BlueBadgeTeamProject");

module.exports = sequelize;