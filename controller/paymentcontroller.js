const Booking = require("../model/booking");
const Payment = require("../model/payment");
const User = require("../model/user");
class PaymentController {
  constructor() {}

  static async showPaymentinfo(req, res) {
    let search = req.query.search;
    let condition = "WHERE b.bkStatus != 'CANCEL'";
    if (search != null && search != "") {
      condition +=
        " AND ct.ctFirstName like '%" +
        search +
        "%' OR ct.ctLastName like '%" +
        search +
        "%' OR b.bkStatus like '%" +
        search +
        "%' OR b.BookingID='" +
        search +
        "' OR b.bkTotalPrice='" +
        search +
        "' OR b.bkCheckInDate='" +
        search +
        "'";
    }
    try {
      let data = await Payment.showPaymentinfo(condition);
      let dataResult = [];
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let body = {
            rowId: data[i].rowId,
            ctUserID: data[i].ctUserID,
            ctFullname: data[i].ctFullname,
            BookingID: data[i].BookingID,
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
          };
          dataResult.push(body);
        }
        res.status(200).json(dataResult);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async showRoomPayment(req, res) {
    let booking = req.query.bookingid;
    try {
      let results = await Payment.showPaymentroom(booking);
      let dataResult = [];
      if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
          let body = {
            rowId: results[i].rowId,
            ctUserID: results[i].ctUserID,
            ctFullname: results[i].ctFullname,
            BookingID: results[i].BookingID,
            RoomTypeName: results[i].RoomTypeName,
            checkin: results[i].bkCheckInDate,
            checkout: results[i].bkLeaveDate,
            dcCode: results[i].dcCode,
            point: results[i].bkpointDiscount,
            price: results[i].bkTotalPrice,
            getPoint: results[i].bkGetPoint,
            reason: results[i].bkReason,
            status: results[i].bkStatus,
            cIntime: results[i].cIntime,
            cOuttime: results[i].cOuttime,
            image: results[i].rImage,
            deposit: results[i].bkDeposit,
            bkTransfer: results[i].bkTransfer,
          };
          dataResult.push(body);
        }
        res.status(200).json(dataResult);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async createPayment(req, res) {
    let booking = req.body.bookingid;
    let amount = req.body.amount;
    let date = req.body.date;
    let staffid = req.body.staffid;
    let status = req.body.status;
    let userid = req.body.userid;

    try {
      let insert = await Payment.insertPayment(booking, amount, date, staffid);
      try {
        let update1 = await Booking.updateStatus(status, booking);
        if (status === "FULLY PAID") {
          try {
            let data = await User.selectConsumption(userid);
            if (data.length > 0) {
              let ctTotalConsumption = results[0].ctTotalConsumption;
              let rank = "GU231";
              if (ctTotalConsumption > 0 && ctTotalConsumption < 30000) {
                rank = "SI232";
              } else if (ctTotalConsumption < 100000) {
                rank = "GO233";
              } else if (ctTotalConsumption > 100000) {
                rank = "PL234";
              }
              try {
                let update3 = await User.updateMembertype(userid, rank);
              } catch (err) {
                res.status(400).json({ message: err.message });
              }
            }
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      res.status(200);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = PaymentController;
