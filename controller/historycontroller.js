const Booking = require("../model/booking");

class HistoryController {
  constructor() {}

  static async getBooking(req, res) {
    let userid = req.query.userid;
    try {
      let data = await Booking.bookingOfUser(userid);

      if (data.length > 0) {
        let dataResult = [];
        for (let i = 0; i < data.length; i++) {
          let body = {
            rowId: data[i].rowId,
            BookingID: data[i].BookingID,
            RoomTypeName: data[i].RoomTypeName,
            checkin: data[i].bkCheckInDate,
            checkout: data[i].bkLeaveDate,
            dcCode: data[i].dcCode,
            point: data[i].bkpointDiscount,
            price: data[i].bkTotalPrice,
            getPoint: data[i].bkGetPoint,
            cancelFlag: data[i].bkReason == null ? "N" : "Y",
            reason: data[i].bkReason,
            status: data[i].bkStatus,
            reviewOpen: data[i].reviewOpen,
          };
          dataResult.push(body);
        }
        res.status(200).send(dataResult);
        res.end();
      } else {
        res.status(400);
        res.end();
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
      res.end();
    }
  }

  static async cancelRoom(req, res){
    let userid = req.body.userid;
    let bookingid = req.body.bookingid;
    let reason = req.body.reason;
    try{
      let data = await Booking.selectroomCancelInfo(userid, bookingid);
      if (data.length > 0) {
        if (data[0].bkStatus === "NOT PAID") {
          try{
            let data1 = await Booking.updateCancelBooking(reason, userid, bookingid);
            try {
              let data2 = await Booking.updateCustomerInfo(bookingid, userid);
              res.status(200).json({ message: "ok" });
              res.end();
            } catch (err) {
              res.status(400).json({ message: err.message });
              res.end();
            }
          } catch (err) {
            res.status(400).json({ message: err.message });
            res.end();
          }
        } else {
          res.status(400);
          res.end();
        }
      } else {
        res.status(400);
        res.end();
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
      res.end();
    }
  }
}

module.exports = HistoryController;
