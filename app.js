const express = require("express");
const bodyParser = require("body-parser");
const RoomController = require("./controller/roomcontroller.js");
const UserController = require("./controller/usercontroller.js");
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
    this.app.listen(3001, () => {
      console.log("Server started on port 3001");
    });
  }

  setupRoutes() {
    // this.app.get("/roomid", RoomController.getRoomID);
    this.app.get("/user-info", UserController.getUserInfo);
    this.app.put("/room/clean", RoomController.cleanRoom);
    // this.app.get("/room/clean", async (req, res) => {
    //   res.send("Hello world");
    // });
    this.app.get("/room", RoomController.getRoom);
  }
}

async function main() {
  const app = new App();
}

main();

// Export the MyApp class
