let express = require('express');           //使用express
let router = express.Router();               //放数据



const firstQuery = require('../operation/firstQuery')
const studentCount = require('../operation/studentCount')
const firstRecruit = require('../operation/firstRecruit')


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


    const STUDENTNUMBER = await studentCount();

    for(let i = 0; i < STUDENTNUMBER; i++) {
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