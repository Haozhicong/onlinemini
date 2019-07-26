const express = require('express');
const router = express.Router();
const db = require("../utils/db");

router.post('/iconSearch', (req, res) => {
    // 出发地
    const startAdd = req.body.startAdd
    const endAdd = req.body.endAdd
    // 出发日期
    const satrDate = req.body.satrDate
    // 出发时间
    const satrTime = req.body.satrTime
    // 出发人数
    const numberP = req.body.numberP
    if (req.body) {
        db.query(`SELECT * FROM info_list 
        WHERE icon_satrDate = "${satrDate}" 
        AND
        icon_numberP > ${numberP}
        AND
        icon_startAdd LIKE "%${startAdd}%"
        AND
        CONCAT(icon_midAdd, icon_endAdd) LIKE '%${endAdd}%'`, [], (resultr, error) => {
                console.log(resultr)
                res.json({
                    data: resultr,
                    code: 200
                })
            })
    } else {
        res.json({
            code: 500,
            message: "服务器异常，请联系管理员!"
        })
    }

})
module.exports = router