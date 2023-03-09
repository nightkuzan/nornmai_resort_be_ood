const mysql = require("mysql2/promise");
const Room = require("../model/room.js");
class RoomController {
  constructor() {}

  static async getRoom(pool) {
    try {
      const [rows] = await pool.execute("SELECT RoomID FROM roominfo");
      return rows.map((row) => row.RoomID);
    } catch (err) {
      return err;
    }
  }

  static async getRoomID(req, res) {
    const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "nornmai_resort",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    try {
      const data = await this.getRoom(pool);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = RoomController;
