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
}

module.exports = Room;
