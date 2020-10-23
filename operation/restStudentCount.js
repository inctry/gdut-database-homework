let student = require('../table_element/student')


async function restStudentCount() {
    let res = await student.secondStudentCount();
    res = res[0]['COUNT(*)'];
    return res;
}

module.exports = restStudentCount