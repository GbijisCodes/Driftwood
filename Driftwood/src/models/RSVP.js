// models/RSVP.js
const { DataTypes } = require('sequelize');
const {sequelise} = require('./dbconfig'); // Update with your database config path
const User = require('./user');
const Event = require('./events');



const RSVP = sequelise.define('RSVP', {
    status: {
        type: DataTypes.STRING,
        defaultValue: 'confirmed', // Could have values like 'confirmed', 'cancelled', etc.
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});



module.exports = RSVP;
