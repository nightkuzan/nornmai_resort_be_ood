const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const UserController = require("./controller/roomcontroller.js");
class App {
  constructor() {
    // Set up the Express app
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // Set up the MySQL connection

    // Set up the routes
    // this.setupRoutes();
    this.setupRoutes();
    // Start the server
    this.app.listen(3001, () => {
      console.log("Server started on port 3001");
    });
  }

  setupRoutes() {
    this.app.get("/roomid", UserController.getRoomID.bind(UserController));
    // this.app.get()
  }
}

async function main() {
  const db = new App();
}

main();

// Export the MyApp class
