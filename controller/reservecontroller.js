const Booking = require("../model/booking");
const Room = require("../model/room");

class ReserveController {
  constructor() {}

  static async reserveRoom(req, res) {
    let checkin = req.query.checkin;
    let checkout = req.query.checkout;
    let type = req.query.type;
    let id = req.query.roomID;

    var from = new Date(checkin);
    var to = new Date(checkout);

    try {
      let data = await Room.getReserveRoom(from, to, type, id);
      if (data.length > 0) {
        let dataResult = [];
        for (let i = 0; i < data.length; i++) {
          let body = {
            roomTypeID: data[i].RoomTypeID,
            roomTypeName: data[i].RoomTypeName.toUpperCase(),
            capacity: data[i].rCapacity,
            freeRoom: data[i].roomFree,
            image: data[i].rImage,
            description: data[i].rDescription,
            price: data[i].rDefaultPrice,
          };
          dataResult.push(body);
        }
        res.status(200).send(dataResult[0]);
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async searchRoom(req, res) {
    let checkin = req.query.checkin;
    let checkout = req.query.checkout;
    let rfloor = req.query.rfloor;
    let rtype = req.query.rtype;
    let rprice = req.query.rprice;
    let rcapacity = req.query.rcapacity;
    console.log(req.query);
    try {
      let data = await Room.selectAvailableRoom(
        rtype,
        rfloor,
        rprice,
        rcapacity,
        checkin,
        checkout
      );

      if (data.length > 0) {
        let dataResult = [];
        for (let i = 0; i < data.length; i++) {
          let body = {
            roomTypeID: data[i].RoomTypeID,
            roomTypeName: data[i].RoomTypeName,
            capacity: data[i].rCapacity,
            freeRoom: data[i].roomFree,
            image: data[i].rImage,
            description: data[i].rDescription,
            price: data[i].rDefaultPrice,
            roomID: data[i].RoomID,
          };
          dataResult.push(body);
        }
        res.send(dataResult);
        // console.log(query);
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async createReserve(req, res) {
    let checkin = req.body.checkin;
    let checkout = req.body.checkout;
    let userid = req.body.userid;
    let numPeople = req.body.numPeople;
    let pointDiscount = req.body.pointDiscount;
    let totalPrice = req.body.totalPrice;
    let dcCode = req.body.dcCode;
    let depositPrice = (totalPrice * 40) / 100;
    let point = totalPrice / 10;
    let roomType = req.body.roomType;
    let roomID = req.body.roomID;
    let transferimg = req.body.transferimg;

    if (userid && roomType) {
      try {
        let insert = await Booking.createBooking(
          userid,
          checkin,
          checkout,
          numPeople,
          pointDiscount,
          totalPrice,
          dcCode,
          depositPrice,
          point,
          roomType,
          roomID,
          transferimg
        );
        try {
          let update = await User.addPointFromReserve(pointDiscount, userid);

          res.status(200);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  }
}

module.exports = ReserveController;
