const db = require("../db");
const moment = require("moment");
class ReserveDMC {
  constructor() {}

  static async getReserveRoom(from, to, type, id) {
    let query =
      "select min(a.room_free) as roomFree, a.RoomTypeID, a.RoomTypeName, a.rDefaultPrice, a.rImage, a.rRating, a.rCapacity, a.rDescription,a.RoomID from (";
    for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
      let date = moment(day).format("YYYY-MM-DD");
      query +=
        "select r.RoomTotal - count(b.RoomTypeID) as room_free,ri.RoomID, r.RoomTypeID, r.RoomTypeName, ri.rDefaultPrice, ri.rImage, ri.rRating, ri.rCapacity, ri.rDescription from roomtype r " +
        "left join bookinginfo b  on b.RoomTypeID = r.RoomTypeID and '" +
        date +
        "' BETWEEN b.bkCheckInDate and b.bkLeaveDate and b.bkLeaveDate != '" +
        date +
        "' and b.bkStatus != 'CANCEL' " +
        "JOIN (SELECT DISTINCT RoomID, RoomTypeID, rDefaultPrice, rImage, rRating, rCapacity, rDescription, rfloor FROM roominfo) ri ON ri.RoomTypeID = r.RoomTypeID WHERE b.bkReason IS NULL " +
        "group by r.RoomTypeID, r.RoomTypeName, r.RoomTotal, ri.rDefaultPrice, ri.rImage, ri.rRating, ri.rCapacity, ri.rDescription ";
      if (day < to) {
        query += "UNION ";
      }
    }
    query +=
      ") a GROUP by a.RoomTypeName, a.rDefaultPrice, a.rImage, a.rRating, a.rCapacity, a.RoomTypeID, a.rDescription HAVING a.RoomTypeID='" +
      type +
      "' and a.RoomID='" +
      id +
      "'";

    return db.query(query);
  }

  static async selectAvailableRoom(
    rtype,
    rfloor,
    rprice,
    rcapacity,
    checkin,
    checkout
  ) {
    rtype = rtype + " Room";

    if (rfloor == "all") {
      rfloor = "";
    }
    if (rtype == "all Room") {
      rtype = "";
    }
    if (rprice == "all") {
      rprice = "";
    }
    if (rcapacity == "all") {
      rcapacity = "";
    }

    var from = new Date(checkin);
    var to = new Date(checkout);

    // loop for every day
    let query =
      "select min(a.room_free) as roomFree, a.RoomTypeID, a.RoomTypeName, a.rDefaultPrice, a.rImage, a.rRating, a.rCapacity, a.rDescription,a.RoomID from (";
    for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
      let date = moment(day).format("YYYY-MM-DD");
      query +=
        "select r.RoomTotal - count(b.RoomTypeID) as room_free,ri.RoomID, r.RoomTypeID, r.RoomTypeName, ri.rDefaultPrice, ri.rImage, ri.rRating, ri.rCapacity, ri.rDescription from roomtype r " +
        "left join bookinginfo b  on b.RoomTypeID = r.RoomTypeID and '" +
        date +
        "' BETWEEN b.bkCheckInDate and b.bkLeaveDate and b.bkLeaveDate != '" +
        date +
        "' and b.bkStatus != 'CANCEL' " +
        "JOIN (SELECT DISTINCT RoomID, RoomTypeID, rDefaultPrice, rImage, rRating, rCapacity, rDescription, rfloor FROM roominfo) ri ON ri.RoomTypeID = r.RoomTypeID WHERE b.bkReason IS NULL ";

      if (rtype != "") {
        query += "and r.RoomTypeName = " + "'" + rtype + "'" + " ";
      }
      if (rfloor != "") {
        query += "and ri.rfloor like " + "'" + rfloor + "%'" + " ";
      }
      if (rcapacity != "") {
        query += "and ri.rCapacity = " + "'" + rcapacity + "'" + " ";
      }
      if (rprice != "") {
        // price is range ex. 1000-2000
        let price = rprice.split("-");
        let min = price[0];
        let max = price[1];
        // cast to int
        min = parseInt(min);
        max = parseInt(max);
        query += "and ri.rDefaultPrice between " + min + " and " + max + " ";
      }
      query +=
        "group by r.RoomTypeID, r.RoomTypeName, r.RoomTotal, ri.rDefaultPrice, ri.rImage, ri.rRating, ri.rCapacity, ri.rDescription, ri.RoomID ";
      if (day < to) {
        query += "UNION ";
      }
    }
    query +=
      ") a GROUP by a.RoomTypeName, a.rDefaultPrice, a.rImage, a.rRating, a.rCapacity, a.RoomTypeID, a.rDescription, a.RoomID order by a.rDefaultPrice";

    console.log(query);
    return db.query(query);
  }
}

module.exports = ReserveDMC;
