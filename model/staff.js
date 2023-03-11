const db = require('../db');

class Staff {
    constructor(){

    }
    static async allstaff(){
        return db.query("SELECT s.StaffID, s.sFirstName, s.sLastName, s.sPhoneNum, s.sMail, p.pName FROM staffinfo s left join position p on p.PositionID = s.PositionID");
    }
}

module.exports = Staff;