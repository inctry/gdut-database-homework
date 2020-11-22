
let student_copy = require('../table_element/student_copy')
let university_copy = require('../table_element/university_copy')


async function secondRecruit(stu) {


    let mark = false;

    let major = await university_copy.retrive({
        where: " WHERE 招生计划数 != 0",
        order: " ORDER BY 录取最低分 DESC, 招生计划数 ASC", // add a rule of sort
        limit: " LIMIT 1"
    })


    if(major.length === 0) return false;
    major = major[0];
    
    mark = await university_copy.update({
        data: {
            招生计划数: major['招生计划数'] - 1
        },
        where: `WHERE 专业代号 = '${major['专业代号']}'`
    })
    mark = await student_copy.update({
        data: {
            最终专业: `'${major['专业名称']}',`,
            录取情况: `'调剂录取'`
        },
        // where: `WHERE 姓名 = '${stu['姓名']}' and 排位 = ${stu['排位']}`
        where: `WHERE ID = ${stu[`ID`]}`
    })

    return true;
    
}

module.exports = secondRecruit