import express from "express";
import Whiteboard from "../db/whiteboard.js";

const router = express.Router();
const db = new Whiteboard()

router.get("/:boardName", async (req, res) => {
  const filter = {boardName: req.params.boardName}

  try {
    const whiteboard = await db.get(filter)
  
    if (whiteboard[0]) {
      res.status(200).send(whiteboard[0])
    } else {
      let board = {
        boardName: req.query.boardName,
        items: []
      }
      let newWhiteboard = await db.add(board)
      res.status(201).send(newWhiteboard).status(201)
    }
  } catch (e) {
    console.log(e)
    res.status(404).send(e)
  }
});


export default router;