import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import express from "express";
import redisClient from "./db/connection.js";
import socketOperations from "./socketOperations.js";
import serverOperations from "./serverOperations.js";

redisClient.connect();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketOperations(io);
serverOperations(app);

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on ${process.env.SERVER_PORT}`);
});
