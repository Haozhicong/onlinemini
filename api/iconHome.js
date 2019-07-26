const express = require('express');
const router = express.Router();
const db = require("../utils/db");
const moment = require('moment');
const nowDate = moment().format('YYYY-MM-DD');

router.post('/homeList', (req, res, next) => {
    // 一次显示多少条记录
    let endCount = req.body.limit
    // 当前页码
    let starPage = (req.body.page - 1) * endCount
    // 查询出的总数变量
    let resCount;
    if (req.body.limit && req.body.page) {
        db.query(`SELECT count(*) FROM info_list WHERE icon_satrDate >= '${nowDate}'`, [], (result, error) => {
            for (const key in result[0]) {
                resCount = result[0][key]
            }
            let totalPage = (resCount + endCount - 1) / endCount;
            // 查询第一页 limit 条数据
            db.query(`
            SELECT * FROM info_list WHERE icon_satrDate >= '${nowDate}' 
            ORDER BY icon_satrDate ASC LIMIT ${endCount} OFFSET ${starPage}`, [], (result, error) => {
                    res.json({
                        code: 200,
                        data: result,
                        totalPage: totalPage
                    })
                })
        })
    }else{
        res.json({
            code: 500,
            message:"服务器异常，请联系管理员!"
        })
    }



})


module.exports = router