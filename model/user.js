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

  static async update(firstName, lastName, dob, gender, userId) {
    return db.query(
      "UPDATE customerinfo SET ctFirstName=?,ctLastName=?,ctGender=?,ctDOB=? WHERE ctUserID = ?",
      [firstName, lastName, gender, dob, userId]
    );
  }

  static async selectPoint(userId) {
    return db.query(
      "SELECT c.ctPoint FROM customerinfo c WHERE c.ctUserID='" + userId + "'"
    );
  }

  static async updatePoint(booking, userid) {
    return db.query(
      "UPDATE customerinfo c set c.ctPoint = c.ctPoint + (select b.bkGetPoint from bookinginfo b where b.BookingID = ?), c.ctTotalConsumption = c.ctTotalConsumption + (select b.bkTotalPrice from bookinginfo b where b.BookingID = ?) where c.ctUserID = ?",
      [booking, booking, userid]
    );
  }

  static async selectConsumption(userid) {
    return db.query(
      "select c.ctTotalConsumption from customerinfo c where c.ctUserID = ?",
      [userid]
    );
  }

  static async updateMembertype(userid, rank) {
    return db.query(
      "UPDATE customerinfo c set c.mbTypeID = ? WHERE c.ctUserID = ?",
      [rank, userid]
    );
  }
}

module.exports = User;
