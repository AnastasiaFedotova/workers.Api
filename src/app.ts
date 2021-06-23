import express from 'express';
import cors from 'cors';
import v1Router from './routers/v1/v1api';
import './db/workerShema';

const app = express();
const port = process.env.PORT || 3000;
const whitelist = ['http://localhost:4200', 'https://localhost:4200', 'http://localhost:59797', 'https://localhost:59797' ];
app.set("port", port);

const http = require("http").Server(app);
const socketOptions = {
  cors: {
    origin: whitelist,
    methods: ["GET", "POST"]
  }
}

const io = require("socket.io")(http, socketOptions);
app.set('socketio', io);

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', v1Router);

io.on("connection", function(_socket) {
  console.log("connected");
})

http.listen(3000, function() {
  console.log("listening on *:3000");
})
