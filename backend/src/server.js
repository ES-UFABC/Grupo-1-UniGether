import "express-async-errors"
import "reflect-metadata"
import http from "http";
import express from 'express';
import routes from './routes/index'
import './database';
import cors from 'cors';
import socket from 'socket.io';
import errorHandler from "./middlewares/error"
import groupHandler from "./sockets/group.socket"
import messageHandler from "./sockets/message.socket";
// import helmet from 'helmet';

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

const cors = {
  origin: "*",
  methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
  credentials: false
}

const app = express();
app.use(cors(corsOptions));
// app.use(helmet);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

const port = process.env.PORT || 8080;
const server = http.Server(app);
server.listen(port);

const io = socket(server, cors);

const onConnection = (socket) => {
  groupHandler(io, socket);
  messageHandler(io, socket);
}

io.on("connection", onConnection);
