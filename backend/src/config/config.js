const dotenv = require("dotenv");
const { resolve } = require("path")
dotenv.config({path:resolve(__dirname,"..","..",".env")});

const dialectOptions = {
    ssl: {
        require: process.env.SSL == "true",
        rejectUnauthorized: false
    }
}

module.exports = {
    dialect: "postgres",
    dialectOptions: process.env.SSL == "true" ? dialectOptions : {},
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
};