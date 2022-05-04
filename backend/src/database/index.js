const { Sequelize } = require('sequelize');
const pg = require("pg");
const User = require('../app/models/Users.js');
const Group = require('../app/models/Groups.js');
const Matches = require('../app/models/Matches.js');
const Message = require('../app/models/Messages.js');
const Events = require('../app/models/Events.js')

pg.defaults.ssl = process.env.SSL;
const models = [User, Group, Matches, Message, Events];

class Database {
    constructor() {
        this.init();
    }

    init() {
       if(!process.env.DATABASE_URL){
            const url = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE}`
            this.connection = new Sequelize(url, {
                dialect: process.env.DATABASE_DIALECT,
                dialectModule: pg,
                define:{
                    timestamps:true,
                    underscored: true
                }
            });
        }else{
            this.connection = new Sequelize(process.env.DATABASE_URL, {
                dialect: process.env.DATABASE_DIALECT,
                dialectModule: pg,
                ssl:process.env.SSL,
                native:true,
                define:{
                    timestamps:true,
                    underscored: true,
                    ssl:process.env.SSL
                }
            });
        }

        models.map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));

    }
}

module.exports = new Database()