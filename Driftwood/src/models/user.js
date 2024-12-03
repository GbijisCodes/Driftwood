// models/User.js
const { DataTypes } = require('sequelize');
const {sequelise }= require('./dbconfig'); 
const bcrypt = require('bcryptjs');
const Event = require('./events');
const RSVP = require('./RSVP');

const User = sequelise.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone_no: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userRole: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    }
  },
});

User.hasMany(Event)
User.hasMany(RSVP)
module.exports = User;
