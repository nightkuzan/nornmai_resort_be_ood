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
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = HistoryController;
