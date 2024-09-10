const mysql = require("mysql2")

var db = mysql.createConnection({
    host: 'localhost',
    database: "blog_db",
    user: 'root',
    password: 'Type your database password here'
})

module.exports = db;
