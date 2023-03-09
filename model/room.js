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
}

module.exports = Room;