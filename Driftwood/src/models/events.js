const { DataTypes } = require('sequelize');
const {sequelise } = require('./dbconfig'); 

const Event = sequelise.define('Event', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo_path: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'events',  // Optional: sets a custom table name
  timestamps: true,     // Adds createdAt and updatedAt fields automatically
});

module.exports = Event;
