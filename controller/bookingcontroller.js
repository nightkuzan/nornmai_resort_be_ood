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

  static async selectBooking(req, res) {
    let userid = req.query.userid;
    let bookingid = req.query.bookingid;
    console.log([userid, bookingid]);
    try {
      let data = await Booking.selectOneBooking(userid, bookingid);
      if (data.length > 0) {
        let dataResult = [];
        for (let i = 0; i < data.length; i++) {
          let body = {
            rowId: data[i].rowId,
            BookingID: data[i].BookingID,
            RoomTypeID: data[i].RoomTypeID,
            RoomTypeName: data[i].RoomTypeName,
            checkin: data[i].bkCheckInDate,
            checkout: data[i].bkLeaveDate,
            dcCode: data[i].dcCode,
            point: data[i].bkpointDiscount,
            price: data[i].bkTotalPrice,
            getPoint: data[i].bkGetPoint,
            reason: data[i].bkReason,
            status: data[i].bkStatus,
            cIntime: data[i].cIntime,
            cOuttime: data[i].cOuttime,
            RoomID: data[i].RoomID,
          };
          dataResult.push(body);
        }
        res.status(200).json(dataResult[0]);
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = BookingController;
