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

  static async updateCheckout(req, res){
    let booking = req.body.bookingid;
    let room = req.body.room;
    try{
      let data = await Booking.checkOut(booking);
      if (error) throw error;
      try{
        let data1 = await Booking.cleanStatus(room);
        res.status(201);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } 

  static async updateCheckin(req, res){
    let booking = req.body.bookingid;
    let staffid = req.body.staffid;
    let cInpeople = req.body.cInpeople;
    let cName = req.body.cName;
    let room = req.body.room;
    try{
      let data = await Booking.insertBookingData(cName, room, cInpeople, booking, staffid);
      if (error) throw error;
      try{
        let data1 = await Booking.updateCheckin(room);
        res.status(201);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async CheckinfoOut(req, res){
    let bookingid = req.query.bookingid;
    try{
      let data = await Booking.getCheckoutinfo(bookingid);
      let dataResult = [];
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          try{
            let data1 = await Booking.getpDate(bookingid);
            let body = {
              RoomID: data[i].RoomID,
              cName: data[i].cName,
              cIntime: data[i].cIntime,
              cInpeople: data[i].ctFullname,
              BookingID: data[i].BookingID,
              paymentDate: data1[0].pDate,
              rImage: data[i].rImage,
              checkin: data[i].bkCheckInDate,
              checkout: data[i].bkLeaveDate,
            }
            dataResult.push(body);
            res.status(201).send(dataResult[0]);
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
        } 
      }
      else {
        res.status(200).send({});
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async CheckInfo(req, res){
    let booking = req.query.bookingid;
    try{
      let data = await Booking.getInfoStatusAdmin(booking);
      let dataResult = [];
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          try{
            let data1 = await Booking.checkInfoRoom(data[i].RoomTypeID);
            let roomid = [];
              if (data1.length > 0) {
                for (let i = 0; i < data1.length; i++) {
                  roomid.push(data1[i].RoomID);
                }
              }
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
                image: data[i].rImage,
                deposit: data[i].bkDeposit,
                roomId: roomid,
              };
              dataResult.push(body);
              res.status(201).send(dataResult[0]);
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
        }
      }
    }catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = BookingController;
