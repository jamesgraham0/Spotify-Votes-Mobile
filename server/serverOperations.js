import { roomOperations } from "./roomOperations.js";

const { getRooms, findRoomById } = roomOperations;

export default function serverOperations(app) {
  // Server routes and HTTP request handlers

  app.get("/hi", (req, res) => {
    res.json("Hello World");
  });

  app.get("/rooms", (req, res) => {
    res.json(getRooms());
  });

  app.get("/queue/:id", (req, res) => {
    const { id } = req.params;
    const room = findRoomById(id);
    res.json(room.queue);
  });

  app.get("/code/:id", (req, res) => {
    const { id } = req.params;
    const room = findRoomById(id);
    res.json(room.code);
  });
}
