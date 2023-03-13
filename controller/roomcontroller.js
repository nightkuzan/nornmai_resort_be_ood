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
        res.send(dataResult);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async roomCreate(req, res) {
    let RoomID = req.body.RoomID;
    let RoomTypeName = req.body.RoomTypeName;
    let RoomPrice = req.body.RoomPrice;
    let RoomFloor = req.body.RoomFloor;
    let RoomImage = req.body.RoomImage;
    let RoomBed = req.body.RoomBed;
    let RoomCapacity = req.body.RoomCapacity;
    let RoomDetail = req.body.RoomDescription;
    RoomTypeName = RoomTypeName + " Room";
    let RoomTypeID;
    let RoomSize = 0;
    if (RoomTypeName == "Single Room") {
      RoomSize = 220;
      RoomTypeID = "R00001";
    } else if (
      RoomTypeName == "Standard Room" ||
      RoomTypeName == "Superior Room"
    ) {
      RoomSize = 300;
    } else if (RoomTypeName == "Presidentail Room") {
      RoomSize = 500;
      RoomTypeID = "R00004";
    }

    if (RoomTypeName == "Standard Room") {
      RoomTypeID = "R00002";
    }
    if (RoomTypeName == "Superior Room") {
      RoomTypeID = "R00003";
    }
    try {
      let data = await Room.insertRoom(
        RoomID,
        RoomTypeID,
        RoomFloor,
        RoomBed,
        RoomCapacity,
        RoomSize,
        RoomPrice,
        RoomImage,
        RoomDetail
      );
      res.status(200);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    try {
      let data = await Room.updateRoomTotal(RoomTypeName);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async showRoomAdmin(req, res) {
    try {
      let results = await Room.getRoomAdmin();
      let dataResult = [];
      if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
          let body = {
            RoomID: results[i].RoomID,
            RoomName: results[i].RoomTypeName,
            rStatus: results[i].rStatus,
            rfloor: results[i].rfloor,
            rCleaning: results[i].rCleaningState,
            rNumbed: results[i].rNumBed,
            rCapacity: results[i].rCapacity,
            rSize: results[i].rSize,
            rDefaultPrice: results[i].rDefaultPrice,
            rImage: results[i].rImage,
            rDescription: results[i].rDescription,
            rRating: results[i].rRating,
            RoomTypeID: results[i].RoomTypeID,
          };
          dataResult.push(body);
        }
        res.status(200).json(dataResult);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async adminRoomEdit(req, res) {
    let roomID = req.body.RoomID;
    let roomName = req.body.RoomTypeName;
    let rfloor = req.body.rfloor;
    let rNumbed = req.body.rNumBed;
    let rCapacity = req.body.rCapacity;
    let rDefaultPrice = req.body.rDefaultPrice;
    let rImage = req.body.rImage;
    let rDescription = req.body.rDescription;
    let rDefaultRoomID = req.body.rDefaultRoomID;
    try {
      let data = await Room.editRoomAdmin(
        roomID,
        rfloor,
        rNumbed,
        rCapacity,
        rDefaultPrice,
        rImage,
        rDescription,
        rDefaultRoomID
      );
      if (error) {
        console.log(error);
      }

      if (results) {
        res.status(200);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async adminRoomId(req, res) {
    let roomID = req.query.roomId;
    try {
      let data = await Room.getRoomId(roomID);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async removeRoom(req, res) {
    let roomID = req.body.RoomID;
    let roomTypeID = req.body.RoomTypeID;
    if (roomID) {
      try {
        let del = await Room.deleteRoom(roomID);
        try {
          let upd = await Room.updateDecrease(roomTypeID);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  }
}

module.exports = RoomController;
