const db = require("../db");

class BookingDMC {
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
  static async checkOut(booking) {
    return db.query(
      "UPDATE checkinfo SET cOuttime=CURRENT_TIMESTAMP where BookingID = ?",
      [booking]
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

  static async selectCancel(bookingid) {
    return db.query(
      "SELECT DISTINCT b.bkCheckInDate, b.bkLeaveDate, rt.RoomTypeName, b.bkTotalPrice, b.dcCode, b.bkpointDiscount, cn.RoomID FROM bookinginfo b left join roomtype rt on b.RoomTypeID = rt.RoomTypeID left join checkinfo cn on b.BookingID = cn.BookingID WHERE b.BookingID=?",
      [bookingid]
    );
  }

  static async updateCancel(reason, bookingId) {
    return db.query(
      "UPDATE bookinginfo SET bkReason=?, bkStatus=? WHERE BookingID = ?",
      [reason, "Cancel", bookingId]
    );
  }

  static async selectReason(userid) {
    return db.query(
      "SELECT b.bkReason FROM bookinginfo b where b.ctUserID ='" + userid + "'"
    );
  }

  static async updateStatus(status, booking) {
    return db.query("UPDATE bookinginfo SET bkStatus= ? WHERE BookingID = ?", [
      status,
      booking,
    ]);
  }

  static async selectroomCancelInfo(userid, bookingid) {
    return db.query(
      "SELECT b.bkStatus FROM bookinginfo b WHERE b.ctUserID='" +
        userid +
        "' AND b.BookingID='" +
        bookingid +
        "'"
    );
  }

  static async updateCancelBooking(reason, userid, bookingid) {
    return db.query(
      "UPDATE bookinginfo b  SET b.bkReason = '" +
        reason +
        "', b.bkStatus = 'CANCEL' WHERE b.ctUserID='" +
        userid +
        "' AND b.BookingID='" +
        bookingid +
        "' AND b.bkStatus = 'NOT PAID'"
    );
  }

  static async updateCustomerInfo(bookingid, userid) {
    return db.query(
      "UPDATE customerinfo SET ctPoint=ctPoint+(select bkpointDiscount from bookinginfo where BookingID='" +
        bookingid +
        "') WHERE ctUserID='" +
        userid +
        "'"
    );
  }

  static async createBooking(
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
  ) {
    return db.query(
      "INSERT INTO `bookinginfo`(`ctUserID`, `bkCheckInDate`, `bkLeaveDate`, `bkNumPeople`, `bkpointDiscount`, `bkTotalPrice`, `dcCode`, `bkDeposit`, `bkStatus`, `bkGetPoint`, `RoomTypeID`,`RoomID`,`bkTransfer`) VALUES (?,?,?,?,?,?,?,?,'NOT PAID',?,?,?,?)",
      [
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
        transferimg,
      ]
    );
  }
}

module.exports = BookingDMC;
