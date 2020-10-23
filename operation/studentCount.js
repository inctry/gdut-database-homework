let student = require('../table_element/student')


async function studentCount() {
    let res = await student.rowCount();
    res = res[0]['COUNT(*)'];
    return res;
}

module.exports = studentCount