let university = require('../table_element/university')
let student = require('../table_element/student')

async function firstQuery(state) {
    // console.log(student.name);
    // let sql = await student.retrive(state);
    // let res = await connectToDataBase(sql);
    let res = await student.retrive(state)
    return res;
}

module.exports = firstQuery