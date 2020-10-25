const connectToDataBase = require('../dao/connectToDataBase')
const pool = require('../dao/connectToDataBase')

async function createTable() {
    await connectToDataBase(`DROP TABLE IF EXISTS university_copy`)
    await connectToDataBase(`CREATE TABLE university_copy AS SELECT * FROM university`)
    await connectToDataBase(`alter table university_copy add primary key (专业代号)`)
    await connectToDataBase(`DROP TABLE IF EXISTS student_copy`);
    await connectToDataBase('CREATE TABLE student_copy AS SELECT * FROM student WHERE 1 = 2');
    await connectToDataBase('ALTER TABLE student_copy ADD CONSTRAINT pk_PersonID PRIMARY KEY (排位,姓名)');
    await connectToDataBase('INSERT INTO student_copy(姓名,总分,志愿1,志愿2,志愿3,志愿4,志愿5,志愿6,调剂,排位,省份,科类,最终专业,录取情况)  SELECT 姓名,总分,志愿1,志愿2,志愿3,志愿4,志愿5,志愿6,调剂,排位,省份,科类,最终专业,录取情况 FROM student ORDER BY `排位`');
    return true;
}

module.exports = createTable