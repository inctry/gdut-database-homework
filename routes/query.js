let express = require('express');           //使用express
let router = express.Router();               //放数据
let mysql = require('mysql')
let db = require('../config/dataBase')
const Promise = require('bluebird');
let Table = require('../dao/dataBaseCRUD');
let connectToDataBase = require('../dao/connectToDataBase');
const { resolve } = require('bluebird');



/* GET home page. */
router.get('/', function (req, res, next) {

    //  const pool = mysql.createPool(db)
    // pool.getConnection((err, con) => {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log(1);
    //     }
    // })
    // let newobj = Promise.promisifyAll(Table);


    // let university = new Table('university');
    // console.log(university.__proto__.retrive);
    // console.log(university.retriveAsync);
    // university.retriveAsync = promisify(university.retrive)
    // university.retriveAsync({where: null})
    //     .then(console.log)


    let university = new Table('university')
    university = Promise.promisifyAll(university); 
    
    let student = new Table('student')
    student = Promise.promisifyAll(student)
    // make it all function into promise
    connectToDataBase = Promise.promisify(connectToDataBase)
    //   why? I can't figure out on the Internet !!!!

    university.retriveAsync({where: null})
        .then(sql => connectToDataBase(sql))
        .then(
            (result) => console.log(result),
            (err) => {
                console.log(err);
                throw err;
            }
        )
        .then()




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