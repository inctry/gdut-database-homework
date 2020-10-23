const connectToDataBase = require('../dao/connectToDataBase')
const pool = require('../dao/connectToDataBase')

async function createTable() {
    await connectToDataBase(`DROP TABLE IF EXISTS university_copy`)
    await connectToDataBase(`CREATE TABLE university_copy AS SELECT * FROM university`)
    await connectToDataBase(`DROP TABLE IF EXISTS student`)
    await connectToDataBase(`CREATE TABLE student AS SELECT * FROM student_copy`)
    return true;
}

module.exports = createTable