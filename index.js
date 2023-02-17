// OOP Nodejs
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "nornmai_resort",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
class Database {
    constructor() {
        this.pool = pool;
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
    

      close() {
        return new Promise((resolve, reject) => {
          this.pool.end(err => {
            if (err) {
              return reject(err);
            }
            return resolve();
          });
        });
      }
}

async function main(){
    const db = new Database();
    const result = await db.query('SELECT * FROM `membertype`');
    console.log(result);
    await db.close();
}

main();