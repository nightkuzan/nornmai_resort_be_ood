const CheckinOut = require("../DMC/checkinoutDMC");

class CheckinoutController {
    constructor() { }

    static async updateCheckout(req, res) {
        let booking = req.body.bookingid;
        let room = req.body.room;
        try {
            let data = await CheckinOut.checkOut(booking);
            try {
                let data1 = await CheckinOut.cleanStatus(room);
                res.status(200);
                res.end();
            } catch (err) {
                res.status(400).json({ message: err.message });
                res.end();
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
            res.end();
        }
    }

    static async updateCheckin(req, res) {
        let booking = req.body.bookingid;
        let staffid = req.body.staffid;
        let cInpeople = req.body.cInpeople;
        let cName = req.body.cName;
        let room = req.body.room;
        try {
            let data = await CheckinOut.insertBookingData(
                cName,
                room,
                cInpeople,
                booking,
                staffid
            );
            if (error) throw error;
            try {
                let data1 = await CheckinOut.updateCheckin(room);
                res.status(201);
                res.end();
            } catch (err) {
                res.status(400).json({ message: err.message });
                res.end();
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
            res.end();
        }
    }

    static async CheckinfoOut(req, res) {
        let bookingid = req.query.bookingid;
        try {
            let data = await CheckinOut.getCheckoutinfo(bookingid);
            let dataResult = [];
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    try {
                        let data1 = await CheckinOut.getpDate(bookingid);
                        let body = {
                            RoomID: data[i].RoomID,
                            cName: data[i].cName,
                            cIntime: data[i].cIntime,
                            cInpeople: data[i].ctFullname,
                            BookingID: data[i].BookingID,
                            paymentDate: data1[0].pDate,
                            rImage: data[i].rImage,
                            checkin: data[i].bkCheckInDate,
                            checkout: data[i].bkLeaveDate,
                        };
                        dataResult.push(body);
                        res.status(201).send(dataResult[0]);
                        res.end();
                    } catch (err) {
                        res.status(400).json({ message: err.message });
                        res.end();
                    }
                }
            } else {
                res.status(200).send({});
                res.end();
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
            res.end();
        }
    }

    static async CheckInfo(req, res) {
        let booking = req.query.bookingid;
        try {
            let data = await CheckinOut.getInfoStatusAdmin(booking);
            let dataResult = [];
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    try {
                        let data1 = await CheckinOut.checkInfoRoom(data[i].RoomTypeID);
                        let roomid = [];
                        if (data1.length > 0) {
                            for (let i = 0; i < data1.length; i++) {
                                roomid.push(data1[i].RoomID);
                            }
                        }
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
                            image: data[i].rImage,
                            deposit: data[i].bkDeposit,
                            roomId: roomid,
                        };
                        dataResult.push(body);
                        res.status(201).send(dataResult[0]);
                        res.end();
                    } catch (err) {
                        res.status(400).json({ message: err.message });
                        res.end();
                    }
                }
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
            res.end();
        }
    }

    static async inOutCheck(req, res) {
        let search = req.query.search;
        let condition =
            "WHERE b.bkStatus NOT IN ('CANCEL', 'NOT PAID', 'DEPOSIT PAID') ";
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
        } try{
            let data = await CheckinOut.check(condition);
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
                        roomId: data[i].RoomID,
                      };
                      dataResult.push(body);
                }
            }
            res.status(200).send(dataResult);
            res.end();
        } catch (err) {
            res.status(400).json({ message: err.message });
            res.end();
        }
    }
}

module.exports = CheckinoutController;