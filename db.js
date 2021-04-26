const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:codingg1l!@localhost:5432/BlueBadgeTeamProject");

module.exports = sequelize;