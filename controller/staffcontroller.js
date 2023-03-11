const Staff = require('../model/staff');

class StaffController {
    constructor(){}

    static async getAllStaff(req, res){
        try{
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

        try{
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
                try{
                    let data = await Staff.insertStaff(user, firstname, lastname, password, position, salary, phone, email);
                    res.status(200).json(data);
                } catch (err) {
                    res.status(400).json({ message: err.message });
                  }
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
          }
    }

    static async editStaff(req, res){
        let staffid = req.body.staffid;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let salary = req.body.salary;
        let email = req.body.email;
        let phone = req.body.phone;
        let position = req.body.position;

        if(staffid){
            try{
                let data = await Staff.updateStaff(staffid, firstname, lastname, position, salary, phone, email);
                res.status(200).json(data);
            } catch (err) {
                res.status(400).json({ message: err.message });
              }
        }
    }
}

module.exports = StaffController;