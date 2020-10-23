const db = require('../config/dataBase')
const pool = require('../config/dataBasePool')

module.exports = function (sql, callback)  {
    pool.getConnection((err, con) => {
        if(err) {
            return callback(err, null)
        } else {
            con.query(sql, (err_2, data) => {
                if(err_2) {
                    return callback(err_2, null)
                } else {
                    callback(null, data);
                    pool.releaseConnection(con);
                }
            })
        }
    });
}