const db = require("../db");

class Booking {
  constructor() {}
  static async allBookingStaff() {
    return db.query(
      "SELECT b.ctUserID, ct.ctFirstName, ct.ctLastName, b.BookingID, rt.RoomTypeName, b.bkCheckInDate, b.bkLeaveDate, b.dcCode, b.bkpointDiscount,b.bkTotalPrice, b.bkGetPoint, cn.cIntime, cn.cOuttime, b.bkReason, b.bkStatus, rn.rvComment, rn.rvScore FROM bookinginfo b left join reviewinfo rn on b.BookingID=rn.BookingID left join checkinfo cn on cn.BookingID=b.BookingID left join roomtype rt on b.RoomTypeID=rt.RoomTypeID left join customerinfo ct on ct.ctUserID=b.ctUserID ORDER BY b.BookingID ASC"
    );
  }

  static async bookingOfUser(userid) {
    return db.query(
      "SELECT ROW_NUMBER() OVER () as rowId, b.BookingID, r.RoomTypeName, b.bkCheckInDate, b.bkLeaveDate, b.dcCode, b.bkpointDiscount, b.bkTotalPrice, b.bkGetPoint, b.bkReason, b.bkStatus, case when c.cIntime is not null and c.cOuttime is not null and rw.ReviewID is null then 'Y' else 'N' end reviewOpen FROM bookinginfo b left join checkinfo c on b.BookingID = c.BookingID left join roomtype r on r.RoomTypeID = b.RoomTypeID left join reviewinfo rw on rw.BookingID = b.BookingID WHERE b.ctUserID='" +
        userid +
        "' order by b.BookingID desc"
    );
  }

  static async selectOneBooking(userId, bookingId) {
    return db.query(
      "SELECT b.BookingID, r.RoomTypeID, r.RoomTypeName, b.bkCheckInDate, b.bkLeaveDate, b.dcCode, b.bkpointDiscount, b.bkTotalPrice, b.bkGetPoint, b.bkReason, b.bkStatus, c.cIntime, c.cOuttime, c.RoomID FROM bookinginfo b left join checkinfo c on b.BookingID = c.BookingID left join roomtype r on r.RoomTypeID = b.RoomTypeID WHERE b.ctUserID='" +
        userId +
        "' AND b.BookingID='" +
        bookingId +
        "'"
    );
  }
}

module.exports = Booking;
