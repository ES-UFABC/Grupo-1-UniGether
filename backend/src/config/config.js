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
        storage :resolve(__dirname, "..","database","tmp.sqlite"),
        logging: false,
        define:{
            timestamps:true,
            underscored: true,
            ssl:true
        }
    },
    "production":{
        dialect: "postgres",
        protocol: 'postgres',
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
            ssl:true,
            timestamp: true, 
            underscored: true, 
            underscoredAll: true,
        },
    }
    
};