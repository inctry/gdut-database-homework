
let university_copy = require('../table_element/university_copy')
let student_copy = require('../table_element/student_copy');
const e = require('express');

async function firstRecruit(stu) {
    // console.log(stu);
    let isSuccess = false;
    let major = null
    for(let key in stu) {
        if(key.indexOf('志愿') !== -1) {
            if(stu[key] === null) {
                return false;
            }

            let res_num = await university_copy.retrive({
                where: `WHERE 专业代号 = '${stu[key]}' `
            });
            res_num = res_num[0];
            

            // console.log(res_num['招生计划数']);
            if(res_num['招生计划数'] > 0) {
                let number = res_num['招生计划数'];

                let data = {
                    招生计划数: number-1
                }

                if(res_num['录取最低分'] === null || res_num['录取最低分'] > stu['总分']) {
                    data['录取最低分'] = `${stu['总分']}`;
                    data['招生计划数'] = `${number-1},`;
                }


                isSuccess = await university_copy.update({
                    data,
                    where: `WHERE 专业代号 = '${stu[key]}' `
                })
                major = res_num['专业名称']
                break;
            } else {
                if(stu['调剂'] === 0) 
                    return false;
            }
        }
    }
    if(isSuccess === true) {
        let suc = student_copy.update({
            data: {
                最终专业: `'${major}',`,
                录取情况: `'拟录取'`
            },
            where: `WHERE 姓名 = '${stu['姓名']}' and 排位 = ${stu['排位']}`
        })
        return suc;
    }


}

module.exports = firstRecruit