const Discount = require("../model/discount");

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
              } else {
                res.status(400);
              }
        } catch (err) {
            res.status(400).json({ message: err.message });
          }
    }
}

module.exports = DiscountController;