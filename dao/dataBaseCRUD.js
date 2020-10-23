
const debug = require('debug')
const Promise = require('bluebird')
const connectToDataBase = require('./connectToDataBase')



class Table {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async retrive(state) {
        let sql = `SELECT * FROM ${this.tableName} `;

        if(state.where !== null && state.where !== undefined) {
            sql += state.where;
        }
        if(state.order !== null && state.order !== undefined) {
            sql += state.order;
        }
        if(state.limit !== null && state.limit !== undefined) {
            sql += state.limit;
        }
        if(state.offset !== null && state.offset !== undefined) {
            sql += state.offset;
        }
        //   console.log(sql);
        let res = await connectToDataBase(sql)
        //  console.log(res);
        return res;
    }
    async update(state) {
        let sql = `UPDATE ${this.tableName} SET `;
        for(let key in state.data) {
            sql += ` ${key} = ${state.data[key]} `;
        }
        if(state.where !== null && state.where !== undefined) {
            sql += state.where;
        }
        // console.log(sql);

         let res = await connectToDataBase(sql);

        //  console.log(res.protocol41);
        return res.protocol41;
    }
    async rowCount() {
        let sql = `SELECT COUNT(*) FROM ${this.tableName}`;
        let res = await connectToDataBase(sql);
        return res;
    }
    async secondStudentCount() {
        let sql = `SELECT COUNT(*) FROM ${this.tableName} WHERE 调剂 = 1 AND 最终专业 IS NULL`;
        let res = await connectToDataBase(sql);
        return res;
    }
    async secondUniversityCount() {
        let sql = `SELECT COUNT(*) FROM ${this.tableName} WHERE 招生计划数 = 0 
        ORDER BY 录取最低分`;
        let res = await connectToDataBase(sql);
        return res;   
    }

}
module.exports = Table