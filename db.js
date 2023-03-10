const mysql = require("mysql2");

class DB {
  constructor() {
    this.pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "nornmai_resort",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, args, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }
}

module.exports = new DB();
