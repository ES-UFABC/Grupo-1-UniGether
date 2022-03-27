import "express-async-errors"
import "reflect-metadata"
import express from 'express';
import routes from './routes/index'
import { AppError } from './errors/AppError';
import './database';
import cors from 'cors';


var corsOptions = {
    origin: "http://localhost:8081",
    optionsSucessStatus: 200,
    AccessControlAllowOrigin: '*',
    AccessControlAllowCredentials: true,
    AccessControlAllowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    AccessControlAllowHeaders: '*'
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes); 

app.use((err, req, res, next) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message,
        })
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server error ${err.message}`,
    })
})

app.listen(8080);


