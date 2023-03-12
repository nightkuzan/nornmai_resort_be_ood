const express = require("express");
const bodyParser = require("body-parser");
const RoomController = require("./controller/roomcontroller.js");
const UserController = require("./controller/usercontroller.js");
const StaffController = require("./controller/staffcontroller.js");
const BookingController = require("./controller/bookingcontroller.js");
const PaymentController = require("./controller/paymentcontroller.js");
const RegisterController = require("./controller/registercontroller");
const HistoryController = require("./controller/historycontroller");

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
    this.app.get("/staff", StaffController.getAllStaff);
    this.app.post("/staff/add", StaffController.addStaff);
    this.app.put("/staff/edit", StaffController.editStaff);
    this.app.get("/allbooking", BookingController.allBooking);
    this.app.get("/payment", PaymentController.showPaymentinfo);
    this.app.get("/payment-info", PaymentController.showRoomPayment);
    this.app.post("/room-admin/create", RoomController.roomCreate);
    this.app.get("/room-admin", RoomController.showRoomAdmin);
    this.app.put("/room-admin/edit", RoomController.adminRoomEdit);
    this.app.get("/room-admin/roomid", RoomController.adminRoomId);
    this.app.get("/staff-info", StaffController.getStaff);
    this.app.get("/customer", UserController.getAllUser);
    this.app.post("/signup", RegisterController.Signup);
    this.app.post("/login", UserController.login);
    this.app.post("/login-admin", StaffController.login);
    this.app.get("/history", HistoryController.getBooking);
    this.app.put("/update-user", UserController.updateUser);
    this.app.put("/check-out", BookingController.updateCheckout); //
    this.app.post("/check-in", BookingController.updateCheckin); //
    this.app.get("/check-info-out", BookingController.CheckinfoOut); //
    this.app.get("/check-info", BookingController.CheckInfo); //
  }
}

async function main() {
  const app = new App();
}

main();

// Export the MyApp class
