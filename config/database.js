const mysql = require("mysql");

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "nexplex",
//     port: 3306,
//   });

const connection = mysql.createConnection({
  host: "zr.airmode.live",
  user: "digitalman",
  password: "c1vG7R34",
  database: "tracker",
  port: 3306,
});

module.exports = connection;
