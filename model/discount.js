const db = require("../db");

class Discount {
    constructor() {}

    static async selectDiscount(dcCode){
        return db.query("SELECT s.dcRate FROM seasondiscount s WHERE s.dcStartDate <= CURRENT_DATE and s.dcAmount >0  and  s.dcEndDate >= CURRENT_DATE and s.dcCode ='" +
        dcCode +
        "'" + "and (s.dcAmount>0 or s.dcAmount is null)");
    }

    static async updateDiscount(dcCode){
        return db.query("UPDATE seasondiscount SET dcAmount = dcAmount - 1 WHERE dcCode = '" +
        dcCode +
        "'");
    }

    static async postDiscount(dcRate, dcStartDate, dcEndDate, dcAmount, dcCode){
        return db.query("UPDATE seasondiscount SET dcRate = ?, dcStartDate = ?, dcEndDate = ?, dcAmount = ? WHERE dcCode = ?",
        [dcRate, dcStartDate, dcEndDate, dcAmount, dcCode]);
    }

    static async getDiscountInfo(){
        return db.query("SELECT s.dcCode, s.dcRate, s.dcStartDate, s.dcEndDate, s.dcAmount FROM seasondiscount s where s.dcCode !='NONE' order by s.dcEndDate desc");
    }

    static async addDiscount(dcCode, dcRate, startDate, endDate, dcAmount){
        return db.query("INSERT INTO seasondiscount(dcCode, dcRate, dcStartDate, dcEndDate,dcAmount) VALUES (?,?,?,?,?)",
        [dcCode, dcRate, startDate, endDate, dcAmount]);
    }
}

module.exports = Discount;