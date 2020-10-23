const connectToDataBase = require('../dao/connectToDataBase')
const pool = require('../dao/connectToDataBase')

async function createTable() {
    connectToDataBase(`DROP TABLE IF EXISTS university_copy`)
    connectToDataBase(`CREATE TABLE university_copy AS SELECT * FROM university`)
}

module.exports = createTable