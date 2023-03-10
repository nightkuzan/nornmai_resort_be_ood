const { allCustomer } = require("../DMC/userDMC");
const User = require("../DMC/userDMC");

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
        res.end();
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
      res.end();
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
        res.status(200).send(dataResult);
        res.end();
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
      res.end();
    }
  }

  static async login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email);
    console.log(password);
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
          res.send(body);
          res.end();
        } else {
          res.status(404);
          res.end();
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
        res.end();
      }
    } else {
      throw error;
    }
  }

  static async updateUser(req, res) {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let dob = req.body.dob;
    let gender = req.body.gender;
    let userid = req.body.userid;

    if (userid) {
      try {
        let data = await User.update(firstname, lastname, dob, gender, userid);
        res.status(200).send({
          userid: userid,
        });
        res.end();
      } catch (err) {
        res.status(400).json({ message: err.message });
        res.end();
      }
    } else {
      throw "error";
    }
  }

  static async getUserPoint(req, res) {
    let userid = req.query.userid;
    try {
      let data = await User.selectPoint(userid);
      if (data.length > 0) {
        let body = {
          ctPoint: data[0].ctPoint,
        };
        res.status(200).send(body);
        res.end();
      } else {
        res.status(400);
        res.end();
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
      res.end();
    }
  }
}

module.exports = UserController;
