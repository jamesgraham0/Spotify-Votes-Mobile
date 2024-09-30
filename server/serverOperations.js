import { roomOperations } from "./roomOperations.js";
import { check, validationResult } from "express-validator";
import Constants from "./serverConstants.js";
import axios from "axios";
const { getRooms, findRoomById } = roomOperations;

const BASE_URL = Constants.SPOTIFY_API_URL;
const concatUrl = (url) => `${BASE_URL}/${url}`;

export default function serverOperations(app) {
  // Server routes and HTTP request handlers

  app.get(
    "/spotify/getUserInfo",
    [check("accessToken").exists().notEmpty()],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { accessToken } = req.query;
      const url = concatUrl("me");
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        res.json(response?.data);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to obtain user info" });
      }
    }
  );

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

  app.post("/login", (req, res) => {
    const { code } = req.body;

    const tokenEndpoint = "https://accounts.spotify.com/api/token";
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const data = {
      grant_type: "authorization_code",
      code,
      redirect_uri: "exp://127.0.0.1:19000/",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET, // Eventually this should be stored in a separate .env file on the server
    };

    axios
      .post(tokenEndpoint, data, { headers })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Failed to obtain token" });
      });
  });
}
