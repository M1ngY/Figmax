import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Server from 'socket.io';
import http from 'http';

import "./env/env.js";
import Whiteboard from "./db/whiteboard.js"
import whiteboardRoutes from "./routes/whiteboard.js";

const PORT = process.env.PORT || 8000
const app = express()
const server = http.createServer(app)
// const io = new Server(server)

const db = new Whiteboard()

const clients = {}

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use("/whiteboard", whiteboardRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.get("/whiteboard/:id", async (req, res) => {
  try {
      const whiteboardId = req.params.id;
      const whiteboardItem = await db.getById(whiteboardId);
      if (!whiteboardItem) {
          return res.status(404).json({ message: "Whiteboard item not found." });
      }
      res.json(whiteboardItem);
  } catch (err) {
      res.status(500).json({ message: "An error occurred.", error: err.message });
  }
});

app.delete("/whiteboard/:id", async (req, res) => {
  try {
      const whiteboardId = req.params.id;
      const result = await db.deleteById(whiteboardId);
      if (!result) {
          return res.status(404).json({ message: "Whiteboard item not found." });
      }
      res.json({ message: "Whiteboard item deleted successfully." });
  } catch (err) {
      res.status(500).json({ message: "An error occurred.", error: err.message });
  }
});
