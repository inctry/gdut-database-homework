const connectToDataBase = require('../dao/connectToDataBase')
const pool = require('../dao/connectToDataBase')

async function createTable() {
    await connectToDataBase(`DROP TABLE IF EXISTS university_copy`)
    await connectToDataBase(`CREATE TABLE university_copy AS SELECT * FROM university`)
    await connectToDataBase(`alter table university_copy add primary key(专业代号)`)
    await connectToDataBase(`DROP TABLE IF EXISTS student`);
    await connectToDataBase(`CREATE TABLE student AS SELECT * FROM student_copy`);
    await connectToDataBase('ALTER TABLE student ADD CONSTRAINT pk_PersonID PRIMARY KEY (姓名,排位)');
    return true;
}

module.exports = createTable