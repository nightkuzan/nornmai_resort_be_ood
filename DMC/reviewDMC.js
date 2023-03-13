const db = require("../db");

class ReviewDMC {
  constructor() {}

  static async insertReview(bookingId, review, star, roomId) {
    return db.query(
      "INSERT INTO reviewinfo(BookingID, rvComment, rvScore, RoomID) VALUES (?,?,?,?)",
      [bookingId, review, star, roomId]
    );
  }
}

module.exports = ReviewDMC;
