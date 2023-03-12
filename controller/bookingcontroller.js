const Booking = require("../model/booking");

class BookingController {
  constructor() {}

  static async allBooking(req, res) {
    try {
      let data = await Booking.allBookingStaff();
      let dataResult = [];
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let body = {
            cid: data[i].ctUserID,
            fname: data[i].ctFirstName,
            lname: data[i].ctLastName,
            bookid: data[i].BookingID,
            rtname: data[i].RoomTypeName,
            bcheckin: data[i].bkCheckInDate,
            bcheckout: data[i].bkLeaveDate,
            discount: data[i].dcCode,
            pdiscount: data[i].bkpointDiscount,
            totalprice: data[i].bkTotalPrice,
            getpoint: data[i].bkGetPoint,
            checkin: data[i].cIntime,
            checkout: data[i].cOuttime,
            reason: data[i].bkReason,
            bkstatus: data[i].bkStatus,
            review: data[i].rvComment,
            rate: data[i].rvScore,
          };
          dataResult.push(body);
        }
        res.status(201).send(dataResult);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = BookingController;
