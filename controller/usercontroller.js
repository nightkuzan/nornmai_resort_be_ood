const { allCustomer } = require("../model/user");
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

  static async getAllUser(req, res) {
    let dataResult = [];
    try {
      let data = await allCustomer();
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let body = {
            ctUserID: data[i].ctUserID,
            ctEmail: data[i].ctEmail,
            ctTel: data[i].ctTel,
            ctFirstName: data[i].ctFirstName,
            ctLastName: data[i].ctLastName,
            ctGender: data[i].ctGender,
            ctDOB: data[i].ctDOB,
            mbTypeName: data[i].mbTypeName,
            ctPoint: data[i].ctPoint,
            ctTotalConsumption: data[i].ctTotalConsumption,
          };
          dataResult.push(body);
        }
        res.status(200).json(dataResult);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async login(req, res) {
    let email = request.body.email;
    let password = request.body.password;

    if (email && password) {
      try {
        let data = await User.checkCorrect(email, password);
        if (data.length > 0) {
          let body = {
            ctUserId: data[0].ctUserId,
            ctFirstName: data[0].ctFirstName,
            ctLastName: data[0].ctLastName,
            mbTypeID: data[0].mbTypeID,
            mbTypeName: data[0].mbTypeName,
          };
          response.status(200).json(body);
        } else {
          response.status(404);
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } else {
      throw error;
    }
  }
}

module.exports = UserController;
