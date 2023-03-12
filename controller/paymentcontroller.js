const Payment = require('../model/payment');

class PaymentController {
    constructor() { }

    static async showPaymentinfo(req, res) {
        let search = req.query.search;
        let condition = "WHERE b.bkStatus != 'CANCEL'";
        if (search != null && search != "") {
            condition +=
                " AND ct.ctFirstName like '%" +
                search +
                "%' OR ct.ctLastName like '%" +
                search +
                "%' OR b.bkStatus like '%" +
                search +
                "%' OR b.BookingID='" +
                search +
                "' OR b.bkTotalPrice='" +
                search +
                "' OR b.bkCheckInDate='" +
                search +
                "'";
        }
        try {
            let data = await Payment.showPaymentinfo(condition);
            let dataResult = [];
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    let body = {
                        rowId: data[i].rowId,
                        ctUserID: data[i].ctUserID,
                        ctFullname: data[i].ctFullname,
                        BookingID: data[i].BookingID,
                        RoomTypeName: data[i].RoomTypeName,
                        checkin: data[i].bkCheckInDate,
                        checkout: data[i].bkLeaveDate,
                        dcCode: data[i].dcCode,
                        point: data[i].bkpointDiscount,
                        price: data[i].bkTotalPrice,
                        getPoint: data[i].bkGetPoint,
                        reason: data[i].bkReason,
                        status: data[i].bkStatus,
                        cIntime: data[i].cIntime,
                        cOuttime: data[i].cOuttime,
                    };
                    dataResult.push(body);
                }
                res.status(200).json(dataResult);
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async showRoomPayment(req, res){
        let booking = req.query.bookingid;
        try{
            let results = await Payment.showPaymentroom(booking);
            let dataResult = [];
            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                  let body = {
                    rowId: results[i].rowId,
                    ctUserID: results[i].ctUserID,
                    ctFullname: results[i].ctFullname,
                    BookingID: results[i].BookingID,
                    RoomTypeName: results[i].RoomTypeName,
                    checkin: results[i].bkCheckInDate,
                    checkout: results[i].bkLeaveDate,
                    dcCode: results[i].dcCode,
                    point: results[i].bkpointDiscount,
                    price: results[i].bkTotalPrice,
                    getPoint: results[i].bkGetPoint,
                    reason: results[i].bkReason,
                    status: results[i].bkStatus,
                    cIntime: results[i].cIntime,
                    cOuttime: results[i].cOuttime,
                    image: results[i].rImage,
                    deposit: results[i].bkDeposit,
                    bkTransfer: results[i].bkTransfer,
                  };
                  dataResult.push(body);
                }
                res.status(200).json(dataResult);
              }
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = PaymentController;