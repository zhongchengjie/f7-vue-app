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
        res.json({
        	status:"1",
        	result:ret
        });
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

// 查询我的分享
router.post('/getMy', (req, res) => {
    var sql = $sql.share.queryMy;
    var params = req.body;
    console.log(params);
    conn.query(sql,[params.user_id],function(err, result) {
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
     conn.query(sql, [params.content,params.photo,params.user_id], function(err, result) {
         if (err) {
            console.log(err);
         }
         if (result) {
            jsonWrite(res, result);
         }
     })
});

//分享详情
router.get('/getDetail', (req, res) => {
    var sql = $sql.share.detail;
    conn.query(sql,function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//点赞
router.post('/updateLikeNum', (req, res) => {
     var sql = $sql.share.updateLikeNum;
     var params = req.body;
     console.log(params);
     conn.query(sql, [params.share_id], function(err, result) {
         if (err) {
            console.log(err);
         }
         if (result) {
            jsonWrite(res, result);
         }
     })
});

//收藏
router.post('/updateFavorNum', (req, res) => {
     var sql = $sql.share.updateFavorNum;
     var params = req.body;
     console.log(params);
     conn.query(sql, [params.share_id], function(err, result) {
         if (err) {
            console.log(err);
         }
         if (result) {
            jsonWrite(res, result);
         }
     })
});
module.exports = router;
