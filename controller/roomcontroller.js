const Room = require("../model/room.js");

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

  static async cleanRoom(req, res) {
    let roomId = req.query.RoomID;

    if (roomId) {
      try {
        data = await Room.clean(roomId);
        res.status(201).json(data);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  }

  static async getRoom(req, res) {
    try {
      const data = await Room.selectRoom();
      if (data.length > 0) {
        let dataResult = [];
        for (let i = 0; i < data.length; i++) {
          let body = {
            roomTypeID: data[i].RoomTypeID,
            roomTypeName: data[i].RoomTypeName,
            numBed: data[i].rNumBed,
            capacity: data[i].rCapacity,
            image: data[i].rImage,
            description: data[i].rDescription,
            price: data[i].rDefaultPrice,
          };
          dataResult.push(body);
        }
        res.status(201).json(dataResult);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = RoomController;
