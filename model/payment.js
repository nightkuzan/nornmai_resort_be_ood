const db = require('../db');

class Payment {
    constructor(){

    }
    static async showPaymentinfo(condition) {
        return db.query("SELECT ROW_NUMBER() OVER () as rowId, ct.ctUserID, concat(ct.ctFirstName,' ',ct.ctLastName) as ctFullname, b.BookingID, r.RoomTypeName, b.bkCheckInDate, b.bkLeaveDate, b.dcCode, b.bkpointDiscount, b.bkTotalPrice, b.bkGetPoint, b.bkReason, b.bkStatus, c.cIntime, c.cOuttime FROM bookinginfo b left join checkinfo c on b.BookingID = c.BookingID left join roomtype r on r.RoomTypeID = b.RoomTypeID left join customerinfo ct on ct.ctUserID = b.ctUserID " +
        condition +
        " order by b.BookingID desc");
    }
    static async showPaymentroom(booking){
        return db.query("SELECT ct.ctUserID, concat(ct.ctFirstName,' ',ct.ctLastName) as ctFullname,b.bkTransfer, b.BookingID, r.RoomTypeName, b.bkCheckInDate, b.bkLeaveDate, b.dcCode, b.bkpointDiscount, b.bkTotalPrice, b.bkDeposit, b.bkGetPoint, b.bkReason, b.bkStatus, c.cIntime, c.cOuttime, rm.rImage FROM bookinginfo b left join checkinfo c on b.BookingID = c.BookingID left join roomtype r on r.RoomTypeID = b.RoomTypeID left join customerinfo ct on ct.ctUserID = b.ctUserID left join (select DISTINCT RoomTypeID, rImage from roominfo) rm on rm.RoomTypeID = r.RoomTypeID where b.BookingID = '" +
        booking +
        "'");
    }
    static async updatePayment(){
        return db.query();
    }
}

module.exports = Payment;