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


//收藏
router.post('/add', (req, res) => {
     var sql = $sql.favor.add;
     var params = req.body;
     console.log(params);
     conn.query(sql,[params.user_id,params.share_id], function(err, result) {
         if (err) {
            console.log(err);
         }
         if (result) {
            jsonWrite(res, result);
         }
     })
});

//判断是否已经收藏
router.post('/favored', (req, res) => {
     var sql = $sql.favor.favored;
     var params = req.body;
     console.log(params);
     conn.query(sql,[params.user_id,params.share_id], function(err, result) {
         if (err) {
            console.log(err);
         }
         if (result) {
            jsonWrite(res, result);
         }
     })
});



module.exports = router;
