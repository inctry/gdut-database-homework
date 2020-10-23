
let student = require('../table_element/student')

async function secondQuery(state) {

    let res = await student.retrive(state)
    return res;
}

module.exports = secondQuery