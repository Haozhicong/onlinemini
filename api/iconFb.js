const express = require('express');
const router = express.Router();
const db = require("../utils/db");

router.post('/iconFb', (req, res, next) => {
    if (req.body) {
        db.query(`INSERT INTO info_list (
            icon_name, icon_sex, icon_phone, icon_startAdd, icon_endAdd, icon_midAdd, icon_satrDate, icon_satrTime, icon_numberP, icon_carName, icon_rmarked, userid) 
        VALUES 
        ('${req.body.name}','${req.body.sex}','${req.body.phone}','${req.body.startAdd}','${req.body.endAdd}','${req.body.midAdd}','${req.body.satrDate}','${req.body.satrTime}','${req.body.numberP}','${req.body.carName}','${req.body.rmarked}','${req.body.userid}')`, [], (result, error) => {
                if (result.affectedRows === 1) {
                    res.json({
                        code: 200,
                        message: "提交成功！"
                    })
                }
            })
    } else {
        res.json({
            code: 500,
            message: "服务器异常，请联系管理员!"
        })
    }

})

module.exports = router;