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
}

module.exports = StaffController;