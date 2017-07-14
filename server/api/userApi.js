/**
 * Created by zcj on 2017/7/13.
 */
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 增加用户接口
router.get('/getUser', (req, res) => {
    var sql = $sql.user.query;
    conn.query(sql,function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/login', (req, res) => {
     var sql = $sql.user.login;
     var params = req.body;
     console.log(params);
     conn.query(sql, [params.mobile, params.password], function(err, result) {
         if (err) {
            console.log(err);
         }
         if (result) {
            jsonWrite(res, result);
         }
     })
});

router.post('/register', (req, res) => {
     var sql = $sql.user.register;
     var params = req.body;
     console.log(params);
     conn.query(sql, [params.id,params.name,params.mobile, params.password], function(err, result) {
         if (err) {
            console.log(err);
         }
         if (result) {
            jsonWrite(res, result);
         }
     })
});

router.post('/modifyPwd', (req, res) => {
     var sql = $sql.user.modify;
     var params = req.body;
     console.log(params);
     conn.query(sql, [params.password,params.userId], function(err, result) {
         if (err) {
            console.log(err);
         }
         if (result) {
            jsonWrite(res, result);
         }
     })
});

module.exports = router;
