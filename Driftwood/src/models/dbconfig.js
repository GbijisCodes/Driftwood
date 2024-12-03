const { Sequelize } = require('sequelize');
const moment = require("moment-timezone");
// console.log(moment.tz.guess())

const sequelise = new Sequelize("CampusEventManagementSystem" , "postgres" , "Gbiji@135",{
    dialect:'postgres',
    host:"localhost",
    timezone: "UTC"
})




function init(){
    sequelise.sync({
        alter:true,
        logging: false,
    }).then(res=>{
        console.log("Database connection successful")
        return sequelise.query("SET TIMEZONE TO 'UTC+1';")
    }).catch(err=>{
        console.log("Errors:" , err)
    })
}


module.exports = { init , sequelise}
const User = require('./user');
const RSVP = require('./RSVP');
const Event = require('./events');

User 
Event
