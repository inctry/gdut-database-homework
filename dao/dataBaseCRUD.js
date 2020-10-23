
const debug = require('debug')
const Promise = require('bluebird')



class Table {
    constructor(tableName) {
        this.tableName = tableName;
    }

    retrive(state, callback) {
        let sql = `SELECT * FROM ${this.tableName}`;
        if(state.where !== null) {
            sql += state.where;
        }
        callback(null, sql)
    }

}
module.exports = Table