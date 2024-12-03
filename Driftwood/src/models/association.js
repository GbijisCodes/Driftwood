const Event = require("./events");
const RSVP = require("./RSVP");
const User = require("./user");

// Define associations
User.belongsToMany(Event, { through: RSVP });
Event.belongsToMany(User, { through: RSVP });

module.exports = { User, Event};