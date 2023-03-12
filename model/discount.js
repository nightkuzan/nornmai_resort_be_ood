const db = require("../db");

class Discount {
    constructor() {}

    static async selectDiscount(dcCode){
        return db.query("SELECT s.dcRate FROM seasondiscount s WHERE s.dcStartDate <= CURRENT_DATE and s.dcAmount >0  and  s.dcEndDate >= CURRENT_DATE and s.dcCode ='" +
        dcCode +
        "'" + "and (s.dcAmount>0 or s.dcAmount is null)");
    }
}

module.exports = Discount;