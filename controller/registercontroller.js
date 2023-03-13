const User = require("../model/user");

class RegisterController {
  constructor() {}

  static async Signup(req, res) {
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let dob = req.body.dob;
    let email = req.body.email;
    let phone = req.body.phone;
    let gender = req.body.gender;

    if (password && email && phone) {
      try {
        let data = await User.createAccount(
          password,
          firstname,
          lastname,
          dob,
          email,
          phone,
          gender
        );
        try {
          let userId = await User.selectUserId(email);
          let body = {};
          if (userId.length > 0) {
            body = {
              userid: userId[0].ctUserID,
            };
          }
          res.status(200).json(body);
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
  }
}

module.exports = RegisterController;
