import "express-async-errors"
import "reflect-metadata"
import express from 'express';
import routes from './routes/index'
import { AppError } from './errors/AppError';
import './database';
import cors from 'cors';
const http = require('http');
var debug = require('debug')('angular2-nodejs:server');

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};

// var corsOptions = {
//     origin: "http://localhost:8081",
//     optionsSucessStatus: 200,
//     AccessControlAllowOrigin: '*',
//     AccessControlAllowCredentials: true,
//     AccessControlAllowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
//     AccessControlAllowHeaders: '*',
// };

const app = express();

const server = http.Server(app);
const socket = require('socket.io');
const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        credentials: false
    }
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use((err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        })
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server error ${err.message}`,
    })
})

const port = process.env.PORT || 8080;


io.on('connection', (socket) => {
    console.log('new connection made.');

    socket.on('join', function (data) {
        //joining
        socket.join(data.room);

        console.log(data.user + ' joined the room : ' + data.room);

        socket.broadcast.to(data.room).emit('new user joined', { user: data.user, message: 'has joined this room.' });
    });

    socket.on('leave', function (data) {

        console.log(data.user + 'left the room : ' + data.room);

        socket.broadcast.to(data.room).emit('left room', { user: data.user, message: 'has left this room.' });

        socket.leave(data.room);
    });

    socket.on('message', function (data) {

        io.in(data.room).emit('new message', { user: data.user, message: data.message });
    })
})

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



