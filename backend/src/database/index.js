const { Sequelize } = require('sequelize');
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
       if(!process.env.DATABASE_URL && process.env.ENV == "test"){
            const url = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE}`
            this.connection = new Sequelize(url, {
                dialect: process.env.DATABASE_DIALECT,
                dialectModule: pg,
                define:{
                    timestamps:true,
                    underscored: true
                }
            });
        }else if(process.env.DATABASE_URL && process.env.ENV == "prod"){
            this.connection = new Sequelize(process.env.DATABASE_URL, {
                dialect: "postgres",
                protocol: 'postgres',
                ssl: true,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
                define:{
                    timestamps:true,
                    underscored: true,
                    ssl:true
                }
            });
        } else {
            this.connection = new Sequelize("sqlite::memory");
        }

        models.map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));

    }
}

module.exports = new Database()