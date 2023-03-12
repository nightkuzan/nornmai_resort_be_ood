const Staff = require("../model/staff");

class StaffController {
  constructor() {}

  static async getAllStaff(req, res) {
    try {
      const data = await Staff.allstaff();
      if (data.length > 0) {
        let dataResult = [];
        for (let i = 0; i < data.length; i++) {
          let body = {
            StaffID: data[i].StaffID,
            sFirstName: data[i].sFirstName,
            sLastName: data[i].sLastName,
            sPhoneNum: data[i].sPhoneNum,
            sMail: data[i].sMail,
            pName: data[i].pName,
          };
          dataResult.push(body);
        }
        res.status(201).json(dataResult);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  static async addStaff(req, res) {
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let salary = req.body.salary;
    let email = req.body.email;
    let phone = req.body.phone;
    let position = req.body.position;

    try {
      if (password && email && phone) {
        let max = 1;
        let resp = await Staff.selectMaxid();
        if (resp.length > 0) {
          max = resp[0].maxId;
        }
        let user = "ST";
        for (let index = 0; index < 4 - max.toString().length; index++) {
          user += "0";
        }
        user += max + 1;
        try {
          let data = await Staff.insertStaff(
            user,
            firstname,
            lastname,
            password,
            position,
            salary,
            phone,
            email
          );
          res.status(200).json(data);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async editStaff(req, res) {
    let staffid = req.body.staffid;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let salary = req.body.salary;
    let email = req.body.email;
    let phone = req.body.phone;
    let position = req.body.position;

    if (staffid) {
      try {
        let data = await Staff.updateStaff(
          staffid,
          firstname,
          lastname,
          position,
          salary,
          phone,
          email
        );
        res.status(200).json(data);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  }

  static async getStaff(req, res) {
    let staffId = req.query.staffid;
    let dataResult = [];
    try {
      let data = await Staff.selectStaff(staffId);
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let body = {
            staffid: data[i].StaffID,
            firstname: data[i].sFirstName,
            lastname: data[i].sLastName,
            phone: data[i].sPhoneNum,
            email: data[i].sMail,
            pName: data[i].pName,
            position: data[i].PositionID,
            salary: data[i].sSalary,
          };
          dataResult.push(body);
        }
        res.status(200).json(dataResult[0]);
      } else {
        res.status(200).json({});
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async login(req, res) {
    let staffid = req.body.staffid;
    let password = req.body.password;

    if (staffid && password) {
      try {
        let data = await Staff.checkCorrect(staffid, password);
        if (data.length > 0) {
          let body = {
            StaffID: data[0].StaffID,
            sFirstName: data[0].sFirstName,
            sLastName: data[0].sLastName,
            sPhoneNum: data[0].sPhoneNum,
            sMail: data[0].sMail,
            PositionID: data[0].PositionID,
            pName: data[0].pName,
          };
          res.status(200).json(body);
        } else {
          res.status(404);
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  }
}

module.exports = StaffController;
