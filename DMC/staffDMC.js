const db = require("../db");

class StaffDMC {
  constructor() {}
  static async allstaff() {
    return db.query(
      "SELECT s.StaffID, s.sFirstName, s.sLastName, s.sPhoneNum, s.sMail, p.pName FROM staffinfo s left join position p on p.PositionID = s.PositionID"
    );
  }
  static async selectMaxid() {
    return db.query(
      "SELECT max(CAST(right(StaffID, 4) AS UNSIGNED)) as maxId FROM staffinfo"
    );
  }
  static async insertStaff(
    user,
    firstname,
    lastname,
    password,
    position,
    salary,
    phone,
    email
  ) {
    return db.query(
      "INSERT INTO staffinfo(StaffID, sFirstName, sLastName, sPassword, PositionID, sSalary, sPhoneNum, sMail) VALUES (?,?,?,?,?,?,?,?)",
      [user, firstname, lastname, password, position, salary, phone, email]
    );
  }
  static async updateStaff(
    staffid,
    firstname,
    lastname,
    position,
    salary,
    phone,
    email
  ) {
    return db.query(
      "UPDATE staffinfo SET sFirstName=?,sLastName=?,PositionID=?,sSalary=?,sPhoneNum=?,sMail=? WHERE StaffID =?",
      [firstname, lastname, position, salary, phone, email, staffid]
    );
  }

  static async selectStaff(staffId) {
    return db.query(
      "SELECT s.StaffID, s.sFirstName, s.sLastName, s.sPhoneNum, s.sMail, s.PositionID, s.sSalary, p.pName FROM staffinfo s left join position p on p.PositionID = s.PositionID WHERE s.StaffID=?",
      [staffId]
    );
  }

  static async checkCorrect(staffId, password) {
    return db.query(
      "SELECT s.StaffID, s.sFirstName, s.sLastName, s.sPhoneNum, s.sMail, s.PositionID, p.pName FROM staffinfo s left join position p on p.PositionID = s.PositionID WHERE s.StaffID=? AND s.sPassword=? ",
      [staffId, password]
    );
  }
}

module.exports = StaffDMC;
