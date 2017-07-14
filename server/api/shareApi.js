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

// 查询所有的分享
router.get('/getAll', (req, res) => {
    var sql = $sql.share.queryAll;
    conn.query(sql,function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//发表分享
router.post('/add', (req, res) => {
     var sql = $sql.share.add;
     var params = req.body;
     console.log(params);
     conn.query(sql, [params.share_content,params.user_id], function(err, result) {
         if (err) {
            console.log(err);
         }
         if (result) {
            jsonWrite(res, result);
         }
     })
});


module.exports = router;
