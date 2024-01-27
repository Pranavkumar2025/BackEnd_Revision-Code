const mysql = require('mysql');


var connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"college"
});

module.exports = connect;