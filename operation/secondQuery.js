
let student_copy = require('../table_element/student_copy')

async function secondQuery(state) {

    let res = await student_copy.retrive(state)
    return res;
}

module.exports = secondQuery