const express = require("express");
const bodyParser = require("body-parser");
const RoomController = require("./controller/roomcontroller.js");
const UserController = require("./controller/usercontroller.js");
const StaffController = require("./controller/staffcontroller.js");
const BookingController = require("./controller/bookingcontroller.js");
const PaymentController = require("./controller/paymentcontroller.js");
const RegisterController = require("./controller/registercontroller");
const HistoryController = require("./controller/historycontroller");
const ReviewController = require("./controller/reviewcontroller");
const CheckinoutController = require("./controller/checkinoutcontroller");
const DiscountController = require("./controller/discountcontroller");
const ReserveController = require("./controller/reservecontroller");
class App {
  constructor() {
    // Set up the Express app
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // Set up the MySQL connection

    // Set up the routes
    this.setupRoutes();
    // Start the server
    this.app.listen(3002, () => {
      console.log("Server started on port 3002");
    });
  }

  setupRoutes() {
    // this.app.get("/roomid", RoomController.getRoomID);
    this.app.get("/user-info", UserController.getUserInfo);
    this.app.put("/room/clean", RoomController.cleanRoom);
    this.app.get("/room", RoomController.getRoom);
    this.app.get("/staff", StaffController.getAllStaff); //
    this.app.post("/staff/add", StaffController.addStaff); //
    this.app.put("/staff/edit", StaffController.editStaff); //
    this.app.get("/allbooking", BookingController.allBooking); //
    this.app.get("/payment", PaymentController.showPaymentinfo); //
    this.app.get("/payment-info", PaymentController.showRoomPayment); //
    this.app.post("/room-admin/create", RoomController.roomCreate); //
    this.app.get("/room-admin", RoomController.showRoomAdmin); //
    this.app.put("/room-admin/edit", RoomController.adminRoomEdit); //
    this.app.get("/room-admin/roomid", RoomController.adminRoomId); //
    this.app.get("/staff-info", StaffController.getStaff);
    this.app.get("/customer", UserController.getAllUser);
    this.app.post("/signup", RegisterController.Signup);
    this.app.post("/login", UserController.login);
    this.app.post("/login-admin", StaffController.login);
    this.app.get("/history", HistoryController.getBooking);
    this.app.put("/update-user", UserController.updateUser);
    this.app.get("/room-booking", BookingController.selectBooking);
    this.app.post("/review-room", ReviewController.addReview);
    this.app.delete("/room", RoomController.removeRoom);
    this.app.get("/user-point", UserController.getUserPoint);
    this.app.put("/check-out", CheckinoutController.updateCheckout); //
    this.app.post("/check-in", CheckinoutController.updateCheckin); //
    this.app.get("/check-info-out", CheckinoutController.CheckinfoOut); //
    this.app.get("/check-info", CheckinoutController.CheckInfo); //
    this.app.get("/check", CheckinoutController.inOutCheck); //
    // this.app.get("/discount", DiscountController.discountSelect); // query แตก
    this.app.get("/review-cancel-info", BookingController.reviewCaneclInfo);
    this.app.put("/update-reason-cancel", BookingController.cancelBooking); //
    this.app.get("/reason", BookingController.getReason);
    this.app.post("/payment", PaymentController.createPayment);

    this.app.get("/reserve-room", ReserveController.reserveRoom);
    this.app.get("/reserve", ReserveController.searchRoom);
  }
}

async function main() {
  const app = new App();
}

main();

// Export the MyApp class
