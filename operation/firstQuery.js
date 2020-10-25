
let student_copy = require('../table_element/student_copy')

async function firstQuery(state) {
    // console.log(student.name);
    // let sql = await student.retrive(state);
    // let res = await connectToDataBase(sql);
    let res = await student_copy.retrive(state)
    return res;
}

module.exports = firstQuery