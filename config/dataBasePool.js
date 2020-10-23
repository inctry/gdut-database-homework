const mysql = require('mysql')

let db = require('./dataBase')
const pool = mysql.createPool(db)

module.exports = pool