const db = require("../db");
const DB = require("../db");
const moment = require("moment");
class Room {
  constructor(
    id,
    status,
    floor,
    cleaningState,
    numBed,
    capacity,
    size,
    price,
    image,
    description,
    rating,
    typeId
  ) {
    this.id = id;
    this.status = status;
    this.floor = floor;
    this.cleaningState = cleaningState;
    this.numBed = numBed;
    this.capacity = capacity;
    this.size = size;
    this.price = price;
    this.image = image;
    this.description = description;
    this.rating = rating;
    this.typeId = typeId;
  }

  static async getRoom() {
    return DB.query("SELECT RoomID FROM roominfo");
  }

  static async clean(roomId) {
    return DB.query(
      "UPDATE roominfo SET rCleaningState='Y' WHERE RoomID='" + roomId + "'"
    );
  }

  static async checkoutRoom(room) {
    return DB.query(
      "UPDATE roominfo SET rStatus= 'Empty', rCleaningState = 'N' WHERE RoomID = ?",
      [room]
    );
  }

  static async selectRoom() {
    return DB.query(
      "select DISTINCT ri.RoomTypeID, r.RoomTypeName, ri.rNumBed, ri.rCapacity, ri.rImage, ri.rDescription, ri.rDefaultPrice from roominfo ri left join roomtype r on ri.RoomTypeID = r.RoomTypeID"
    );
  }

  static async insertRoom(
    RoomID,
    RoomTypeID,
    RoomFloor,
    RoomBed,
    RoomCapacity,
    RoomSize,
    RoomPrice,
    RoomImage,
    RoomDetail
  ) {
    return DB.query(
      "INSERT INTO roominfo (RoomID, RoomTypeID, rStatus, rfloor, rCleaningState, rNumBed, rCapacity, rSize, rDefaultPrice, rImage, rDescription, rRating) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        RoomID,
        RoomTypeID,
        "Empty",
        RoomFloor,
        "Y",
        RoomBed,
        RoomCapacity,
        RoomSize,
        RoomPrice,
        RoomImage,
        RoomDetail,
        5,
      ]
    );
  }

  static async updateRoomTotal(RoomTypeName) {
    return DB.query(
      "UPDATE roomtype SET RoomTotal = RoomTotal + 1, RoomAvailable = RoomAvailable + 1 WHERE RoomTypeName = ?",
      [RoomTypeName]
    );
  }

  static async getRoomAdmin() {
    return DB.query(
      "SELECT r.RoomID, N.RoomTypeName, r.rStatus, r.rfloor, r.rCleaningState, r.rNumBed, r.rCapacity, r.rSize, r.rDefaultPrice, r.rImage, r.rDescription, r.rRating,N.RoomTypeID  FROM roominfo r left join roomtype N on r.RoomTypeID = N.RoomTypeID"
    );
  }

  static async editRoomAdmin(
    roomID,
    rfloor,
    rNumbed,
    rCapacity,
    rDefaultPrice,
    rImage,
    rDescription,
    RoomTypeID,
    rDefaultRoomID,
  ) {
    return DB.query(
      "UPDATE roominfo SET RoomID = ?, rfloor = ?, rNumBed = ?, rCapacity = ?, rDefaultPrice = ?, rImage = ?, rDescription = ?, RoomTypeID = ? WHERE RoomID = ?",
      [
        roomID,
        rfloor,
        rNumbed,
        rCapacity,
        rDefaultPrice,
        rImage,
        rDescription,
        RoomTypeID,
        rDefaultRoomID,
      ]
    );
  }

  static async getRoomId(roomID) {
    return DB.query(
      "SELECT r.RoomID, N.RoomTypeName, r.rStatus, r.rfloor, r.rCleaningState, r.rNumBed, r.rCapacity, r.rSize, r.rDefaultPrice, r.rImage, r.rDescription, r.rRating  FROM roominfo r left join roomtype N on r.RoomTypeID = N.RoomTypeID WHERE r.RoomID = ?",
      [roomID]
    );
  }

  static async updateRating(roomType) {
    return DB.query(
      "UPDATE roominfo SET rRating=(select AVG(r.rvScore) from reviewinfo r where r.RoomID in (select RoomID from roominfo where RoomTypeID = ?)) where RoomTypeID = ?",
      [roomType, roomType]
    );
  }

  static async deleteRoom(roomID) {
    return DB.query("DELETE FROM roominfo WHERE RoomID = ?", [roomID]);
  }

  static async updateDecrease(roomTypeID) {
    return DB.query(
      "UPDATE roomtype SET RoomTotal = RoomTotal - 1, RoomAvailable= RoomAvailable-1 WHERE RoomTypeID = ?",
      [roomTypeID]
    );
  }

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

module.exports = Room;
