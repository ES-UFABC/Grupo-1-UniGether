const dotenv = require("dotenv");
const { resolve } = require("path")
dotenv.config({path:resolve(__dirname,"..","..",".env")});

module.exports = {
    "development":{
        dialect: "postgres",
        dialectOptions: {},
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE,
        ssl: process.env.SSL == "true",
        define: {
            timestamp: true, 
            underscored: true, 
            underscoredAll: true,
        },
    },
    "test":{
        dialect :"sqlite",
    },
    "production":{
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: process.env.SSL == "true",
                rejectUnauthorized: false
            },
        },
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE,
        ssl: process.env.SSL == "true",
        define: {
            timestamp: true, 
            underscored: true, 
            underscoredAll: true,
        },
    }
    
};