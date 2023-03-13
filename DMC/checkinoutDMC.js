const db = require("../db");

class CheckInOutDMC {
  constructor() {}

  static async checkOut(booking) {
    return db.query(
      "UPDATE checkinfo SET cOuttime=CURRENT_TIMESTAMP where BookingID = ?",
      [booking]
    );
  }

  static async cleanStatus(room) {
    return db.query(
      "UPDATE roominfo SET rStatus= 'Empty', rCleaningState = 'N' WHERE RoomID = ?",
      [room]
    );
  }

  static async insertBookingData(cName, room, cInpeople, booking, staffid) {
    return db.query(
      "INSERT INTO checkinfo(cName, RoomID, cInpeople, BookingID, StaffID) VALUES (?,?,?,?,?)",
      [cName, room, cInpeople, booking, staffid]
    );
  }

  static async updateCheckin(room) {
    return db.query(
      "UPDATE roominfo SET rStatus= 'CHECK-IN' WHERE RoomID = ?",
      [room]
    );
  }

  static async getCheckoutinfo(bookingid) {
    return db.query(
      "SELECT c.RoomID, c.cName, c.cIntime, c.cInpeople, r.rImage, b.bkCheckInDate, b.bkLeaveDate FROM checkinfo c left join roominfo r on r.RoomID = c.RoomID left join bookinginfo b on b.BookingID = c.BookingID where c.BookingID = ?",
      [bookingid]
    );
  }

  static async getpDate(bookingid) {
    return db.query(
      "select p.pDate from paymentinfo p where p.BookingID = ? order by p.pChargesID desc limit 1",
      [bookingid]
    );
  }

  static async getInfoStatusAdmin(booking) {
    return db.query(
      "SELECT ct.ctUserID, concat(ct.ctFirstName,' ',ct.ctLastName) as ctFullname, b.BookingID, r.RoomTypeID, r.RoomTypeName, b.bkCheckInDate, b.bkLeaveDate, b.dcCode, b.bkpointDiscount, b.bkTotalPrice, b.bkDeposit, b.bkGetPoint, b.bkReason, b.bkStatus, c.cIntime, c.cOuttime, rm.rImage FROM bookinginfo b left join checkinfo c on b.BookingID = c.BookingID left join roomtype r on r.RoomTypeID = b.RoomTypeID left join customerinfo ct on ct.ctUserID = b.ctUserID left join (select DISTINCT RoomTypeID, rImage from roominfo) rm on rm.RoomTypeID = r.RoomTypeID where b.BookingID = '" +
        booking +
        "'"
    );
  }

  static async checkInfoRoom(results) {
    return db.query(
      "select ri.RoomID from roominfo ri where ri.RoomTypeID = ? and ri.rStatus = 'Empty' and ri.rCleaningState = 'Y'",
      [results]
    );
  }

  static async check(condition) {
    return db.query(
      "SELECT ROW_NUMBER() OVER () as rowId, ct.ctUserID, concat(ct.ctFirstName,' ',ct.ctLastName) as ctFullname, b.BookingID, r.RoomTypeName, b.bkCheckInDate, b.bkLeaveDate, b.dcCode, b.bkpointDiscount, b.bkTotalPrice, b.bkGetPoint, b.bkReason, b.bkStatus, c.cIntime, c.cOuttime, c.RoomID FROM bookinginfo b left join checkinfo c on b.BookingID = c.BookingID left join roomtype r on r.RoomTypeID = b.RoomTypeID left join customerinfo ct on ct.ctUserID = b.ctUserID " +
        condition +
        " order by b.BookingID desc"
    );
  }
}

module.exports = CheckInOutDMC;
