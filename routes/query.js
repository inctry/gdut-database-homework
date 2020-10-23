let express = require('express');           //使用express
let router = express.Router();               //放数据



const firstQuery = require('../operation/firstQuery')
const studentCount = require('../operation/studentCount')
const firstRecruit = require('../operation/firstRecruit')
const restStudentCount = require('../operation/restStudentCount');
const secondQuery = require('../operation/secondQuery');
const secondRecruit = require('../operation/secondRecruit');
const createTable = require('../operation/createTable')


/* GET home page. */
router.get('/', async function (req, res, next) {
    // let newobj = Promise.promisifyAll(Table);


    // let university = new Table('university');
    // console.log(university.__proto__.retrive);
    // console.log(university.retriveAsync);
    // university.retriveAsync = promisify(university.retrive)
    // university.retriveAsync({where: null})
    //     .then(console.log)


    // make it all function into promise
    // connectToDataBase = Promise.promisify(connectToDataBase)
    //   why? I can't figure out on the Internet !!!!

    // university.retriveAsync({where: null})
    //     .then(sql => connectToDataBase(sql))
    //     .then(
    //         (result) => console.log(result),
    //         (err) => {
    //             console.log(err);
    //             throw err;
    //         }
    //     )
    //     .then()

    createTable();

    console.log("begin first recruit");
    const STUDENT_NUMBER = await studentCount();

    for(let i = 0; i < STUDENT_NUMBER; i++) {
        let res = await firstQuery({
            where: null,
            order: " ORDER BY 排位",
            limit: " LIMIT 1",
            offset: ` OFFSET ${i}`
        });
        let isSuccess = await firstRecruit(res[0])

        // if(!isSuccess) {
        //     console.log('error when Recruiting');
        // }
        //  console.log(i);
    }

    console.log("finish first recruit");

    console.log("begin second recruit");

    const REST_STUDENT_NUMBER = await restStudentCount()

    console.log(REST_STUDENT_NUMBER);

    for(let i = 0; i < REST_STUDENT_NUMBER; i++) {
        let res = await secondQuery({
            where: `WHERE 调剂 = 1 AND 最终专业 IS NULL`,
            order: " ORDER BY 排位",
            limit: " LIMIT 1",
            offset: ` OFFSET ${i}`
        })
        let isSuccess = await secondRecruit(res[0]);
        if(!isSuccess) break;
    }

    console.log("end second recruit");

    // console.log(data);
    // let sql = 'SELECT * FROM UNIVERSITY'

    // connection.query(sql, (err, result) => {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     res.json(result);
    // })

    // res.send()
});
module.exports = router;