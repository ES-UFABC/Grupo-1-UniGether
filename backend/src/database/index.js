const { Sequelize } = require('sequelize');
const { resolve } = require("path")
const config = require("../config/config.js")
const pg = require("pg");
const User = require('../app/models/Users.js');
const Group = require('../app/models/Groups.js');
const Matches = require('../app/models/Matches.js');
const Message = require('../app/models/Messages.js');
const Events = require('../app/models/Events.js')

delete pg.native
pg.defaults.ssl = process.env.SSL == "true";
const models = [User, Group, Matches, Message, Events];

class Database {
    constructor() {
        this.init();
    }

    init() {
       if(!process.env.DATABASE_URL && process.env.ENV == "dev"){
            const url = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE}`
            this.connection = new Sequelize(url, config["development"]);
        }else if(process.env.DATABASE_URL && process.env.ENV == "prod"){
            this.connection = new Sequelize(process.env.DATABASE_URL, config["production"]);
        }else{
            this.connection = new Sequelize("sqlite::memory", {
                logging: false,
            });
        }

        models.map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));  
    }

    async sync(){ await this.connection.sync({force: true}) }
}

module.exports = new Database();