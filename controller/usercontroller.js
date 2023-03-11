const User = require("../model/user");

class UserController {
  constructor() {}

  static async getUserInfo(req, res) {
    let userId = req.query.userid;

    try {
      const data = await User.UserInfo(userId);
      if (data.length > 0) {
        let body = {
          firstname: data[0].ctFirstName,
          lastname: data[0].ctLastName,
          phone: data[0].ctTel,
          email: data[0].ctEmail,
          gender: data[0].ctGender,
          dob: data[0].ctDOB,
          ctPoint: data[0].ctPoint,
          ctTotalConsumption: data[0].ctTotalConsumption,
        };
        res.status(201).json(body);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = UserController;
