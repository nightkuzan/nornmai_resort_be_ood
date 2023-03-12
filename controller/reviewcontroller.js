const Review = require("../model/review");
const Room = require("../model/room");

class ReviewController {
  constructor() {}

  static async addReview(req, res) {
    let bookingid = req.body.bookingid;
    let review = req.body.review;
    let star = req.body.star;
    let roomid = req.body.roomid;
    let roomtype = req.body.roomtype;

    try {
      let data = await Review.insertReview(bookingid, review, star, roomid);
      try {
        let result = await Room.updateRating(roomtype);
        res.status(200);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = ReviewController;
