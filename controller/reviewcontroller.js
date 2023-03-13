const Review = require("../DMC/reviewDMC");
const Room = require("../DMC/roomDMC");

class ReviewController {
  constructor() {}

  static async addReview(req, res) {
    let bookingid = req.body.bookingid;
    let review = req.body.review;
    let star = req.body.star;
    let roomid = req.body.roomid;
    let roomtype = req.body.roomtype;
    console.log(req.body);
    try {
      let data = await Review.insertReview(bookingid, review, star, roomid);
      try {
        let result = await Room.updateRating(roomtype);
        res.status(200);
        res.end();
      } catch (err) {
        res.status(400).json({ message: err.message });
        res.end();
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
      res.end();
    }
  }
}

module.exports = ReviewController;
