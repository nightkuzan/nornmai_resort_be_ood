const mysql = require("mysql2/promise");
const Room = require("../model/room.js");
const DB = require("../db");

class RoomController {
  constructor() {}

  static async getRoomID(req, res) {
    try {
      const data = await Room.getRoom();
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = RoomController;
