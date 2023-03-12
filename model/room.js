const DB = require("../db");

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
    rDefaultRoomID
  ) {
    return DB.query(
      "UPDATE roominfo SET RoomID = ?, rfloor = ?, rNumBed = ?, rCapacity = ?, rDefaultPrice = ?, rImage = ?, rDescription = ? WHERE RoomID = ?",
      [
        roomID,
        rfloor,
        rNumbed,
        rCapacity,
        rDefaultPrice,
        rImage,
        rDescription,
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
}

module.exports = Room;
