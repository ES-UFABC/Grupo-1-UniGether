const dotenv = require("dotenv");
const { resolve } = require("path")
dotenv.config({ path: resolve(__dirname, "..", ".env") });

require("express-async-errors");
require("reflect-metadata");
require('./database/index.js');
const http = require("http");
const express = require('express');
const routes = require('./routes/index.js');
const cors = require('cors');
const socket = require('socket.io');
const errorHandler = require("./middlewares/error.js");
const groupHandler = require("./sockets/group.socket.js");
const messageHandler = require("./sockets/message.socket.js");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

/*const cors = {
  origin: "*",
  methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
  credentials: false
}*/

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

const port = process.env.PORT || 8080;
const server = http.Server(app);
server.listen(port);

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
    credentials: false
  }
});

const onConnection = (socket) => {
  groupHandler(io, socket);
  messageHandler(io, socket);
}

io.on("connection", onConnection);
