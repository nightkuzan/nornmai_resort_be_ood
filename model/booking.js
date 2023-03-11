const db = require('../db');

class Booking {
    constructor(){

    }
    static async allBookingStaff(){
        return db.query("SELECT b.ctUserID, ct.ctFirstName, ct.ctLastName, b.BookingID, rt.RoomTypeName, b.bkCheckInDate, b.bkLeaveDate, b.dcCode, b.bkpointDiscount,b.bkTotalPrice, b.bkGetPoint, cn.cIntime, cn.cOuttime, b.bkReason, b.bkStatus, rn.rvComment, rn.rvScore FROM bookinginfo b left join reviewinfo rn on b.BookingID=rn.BookingID left join checkinfo cn on cn.BookingID=b.BookingID left join roomtype rt on b.RoomTypeID=rt.RoomTypeID left join customerinfo ct on ct.ctUserID=b.ctUserID ORDER BY b.BookingID ASC");
    }
}

module.exports = Booking;