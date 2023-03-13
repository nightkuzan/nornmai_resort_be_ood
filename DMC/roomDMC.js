const db = require("../db");

class Room {
  constructor() {}

  static async getRoom() {
    return db.query("SELECT RoomID FROM roominfo");
  }

  static async clean(roomId) {
    return db.query(
      "UPDATE roominfo SET rCleaningState='Y' WHERE RoomID='" + roomId + "'"
    );
  }

  static async checkoutRoom(room) {
    return db.query(
      "UPDATE roominfo SET rStatus= 'Empty', rCleaningState = 'N' WHERE RoomID = ?",
      [room]
    );
  }

  static async selectRoom() {
    return db.query(
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
    return db.query(
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
    return db.query(
      "UPDATE roomtype SET RoomTotal = RoomTotal + 1, RoomAvailable = RoomAvailable + 1 WHERE RoomTypeName = ?",
      [RoomTypeName]
    );
  }

  static async getRoomAdmin() {
    return db.query(
      "SELECT r.RoomID, N.RoomTypeName, r.rStatus, r.rfloor, r.rCleaningState, r.rNumBed, r.rCapacity, r.rSize, r.rDefaultPrice, r.rImage, r.rDescription, r.rRating,N.RoomTypeID  FROM roominfo r left join roomtype N on r.RoomTypeID = N.RoomTypeID"
    );
  }

  static async editRoomAdmin(
    roomID,
    rfloor,
    rNumbed,
    rCapacity,
    rPrice,
    rImage,
    rDescription,
    RoomTypeID,
    rDefaultRoomID
  ) {
    return db.query(
      "UPDATE roominfo SET RoomID = ?, rfloor = ?, rNumBed = ?, rCapacity = ?, rDefaultPrice = ?, rImage = ?, rDescription = ?, RoomTypeID = ? WHERE RoomID = ?",
      [
        roomID,
        rfloor,
        rNumbed,
        rCapacity,
        rPrice,
        rImage,
        rDescription,
        RoomTypeID,
        rDefaultRoomID,
      ]
    );
  }

  static async getRoomId(roomID) {
    return db.query(
      "SELECT r.RoomID, N.RoomTypeName, r.rStatus, r.rfloor, r.rCleaningState, r.rNumBed, r.rCapacity, r.rSize, r.rDefaultPrice, r.rImage, r.rDescription, r.rRating  FROM roominfo r left join roomtype N on r.RoomTypeID = N.RoomTypeID WHERE r.RoomID = ?",
      [roomID]
    );
  }

  static async updateRating(roomType) {
    return db.query(
      "UPDATE roominfo SET rRating=(select AVG(r.rvScore) from reviewinfo r where r.RoomID in (select RoomID from roominfo where RoomTypeID = ?)) where RoomTypeID = ?",
      [roomType, roomType]
    );
  }

  static async deleteRoom(roomID) {
    return db.query("DELETE FROM roominfo WHERE RoomID = ?", [roomID]);
  }

  static async updateDecrease(roomTypeID) {
    return db.query(
      "UPDATE roomtype SET RoomTotal = RoomTotal - 1, RoomAvailable= RoomAvailable-1 WHERE RoomTypeID = ?",
      [roomTypeID]
    );
  }
}

module.exports = Room;
