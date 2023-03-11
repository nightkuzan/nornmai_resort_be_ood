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
      "SELECT c.ctFirstName, c.ctLastName, c.ctTel, c.ctEmail, c.ctGender, c.ctDOB, c.ctPoint, c.ctTotalConsumption FROM customerinfo c WHERE c.ctUserID=?", [userId] 
    );
  }
}

module.exports = User;
