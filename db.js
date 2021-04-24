const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:codingg1rl!@localhost:5432/BlueBadgeTeamProject");

module.exports = sequelize;