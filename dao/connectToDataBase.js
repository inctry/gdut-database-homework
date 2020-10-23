const { resolve } = require('bluebird');
const db = require('../config/dataBase')
const pool = require('../config/dataBasePool')

module.exports =  function (sql)  {
    return new Promise( (resolve, reject) => {
        pool.getConnection((err, con) => {
            if(err) {
                console.log(err);
                reject(err)
            } else {
                con.query(sql, (err_2, data) => {
                    if(err_2) {
                        console.log(err_2);
                        reject(err)
                    } else {
                        pool.releaseConnection(con);
                        resolve(data)
                    }
                })
            }
        })  
    });
}