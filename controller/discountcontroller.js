const Discount = require("../DMC/discountDMC");

class DiscountController {
    constructor(){}

    static async discountSelect(req, res){
        let dcCode = req.query.dcCode;
        try {
            let data = await Discount.selectDiscount(dcCode);
            if (data.length > 0) {
                let body = {
                  dcRate: data[0].dcRate,
                };
                res.status(200).send(body);
                res.end();
              } else {
                res.status(400);
                res.end();
              }
        } catch (err) {
            res.status(400).json({ message: err.message });
            res.end();
          }
    }

    static async discountUpdate(req, res){
      let dcCode = req.body.dcCode;
      try {
        let data = await Discount.updateDiscount(dcCode);
        if (data.length > 0) {
          let body = {
            dcRate: data[0].dcRate,
          };
          res.status(200).send(body);
          res.end();
        } else {
          res.status(400);
          res.end();
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
        res.end();
      }
    }

    static async discountPost(req, res){
      let dcCode = req.body.dcCode;
      let dcRate = req.body.dcRate;
      let dcStartDate = req.body.dcStartDate;
      let dcEndDate = req.body.dcEndDate;
      let dcAmount = req.body.dcAmount;
      if (dcAmount == "-") {
        dcAmount = null;
      } try {
          let data = await Discount.postDiscount(dcRate, dcStartDate, dcEndDate, dcAmount, dcCode);
          let body = {
            status: "success",
          };
          res.status(200).send(body);
          res.end();
      } catch (err) {
        res.status(400).json({ message: err.message });
        res.end();
      }
    }

    static async discountInfo(req, res){
      let dataResult = [];
      try{
        let data = await Discount.getDiscountInfo();
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            let body = {
              dcCode: data[i].dcCode,
              dcRate: data[i].dcRate,
              startDate: data[i].dcStartDate,
              endDate: data[i].dcEndDate,
              dcAmount: data[i].dcAmount,
            };
            dataResult.push(body);
          }
          res.status(200).send(dataResult);
          res.end();
        } else {
          res.status(200).send(dataResult);
          res.end();
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
        res.end();
      }
    }

    static async discountAdd(req, res){
      let dcCode = req.body.dcCode;
      let dcRate = req.body.dcRate;
      let startDate = req.body.startDate;
      let endDate = req.body.endDate;
      let dcAmount = req.body.dcAmount;
      let amountOrdate = req.body.amountOrdate;
      if (amountOrdate === "amount" || amountOrdate === "both") {
        dcAmount = parseInt(dcAmount);
      } if (dcCode && dcRate) {
        try {
          let data = await Discount.addDiscount(dcCode, dcRate, startDate, endDate, dcAmount);
          res.status(200);
          res.end();
        } catch (err) {
          res.status(400).json({ message: err.message });
          res.end();
        }
      } else {
        res.status(400);
        res.end();
      }
    }
}

module.exports = DiscountController;