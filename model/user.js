const db = require("../db");

class User {
  constructor(firstName, lastName, tel, email, gender, dob, point, consumtion) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.tel = tel;
    this.email = email;
    this.gender = gender;
    this.dob = dob;
    this.point = point;
    this.consumtion = consumtion;
  }

  static async UserInfo(userId) {
    return db.query(
      "SELECT c.ctFirstName, c.ctLastName, c.ctTel, c.ctEmail, c.ctGender, c.ctDOB, c.ctPoint, c.ctTotalConsumption FROM customerinfo c WHERE c.ctUserID=?",
      [userId]
    );
  }

  static async allCustomer() {
    return db.query(
      "SELECT c.ctUserID, c.ctEmail, c.ctTel, c.ctFirstName, c.ctLastName, c.ctGender, c.ctDOB, m.mbTypeName, c.ctPoint, c.ctTotalConsumption FROM customerinfo c left join membertype m on m.mbTypeID = c.mbTypeID"
    );
  }

  static async createAccount(
    password,
    firstName,
    lastName,
    dob,
    email,
    phone,
    gender
  ) {
    db.query(
      "INSERT INTO customerinfo(ctFirstName, ctLastName, ctPassword, ctTel, ctEmail, ctGender, ctDOB, mbTypeID, ctPoint, ctTotalConsumption) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [firstName, lastName, password, phone, email, gender, dob, "GU231", 0, 0]
    );
  }

  static async selectUserId(email) {
    return db.query("SELECT ctUserID FROM customerinfo where ctEmail=?", [
      email,
    ]);
  }

  static async checkCorrect(email, password) {
    return db.query(
      "select c.ctUserId, c.ctFirstName, c.ctLastName, c.mbTypeID, m.mbTypeName from customerinfo c left join membertype m on c.mbTypeID = m.mbTypeID WHERE c.ctEmail = ? AND c.ctPassword = ?",
      [email, password]
    );
  }
}

module.exports = User;
