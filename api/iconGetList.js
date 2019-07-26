const express = require('express');
const router = express.Router();
const db = require("../utils/db");

router.post('/iconGetList', (req, res, next) => {
    const userid = req.body.userid
    if (userid) {
        db.query(`SELECT * FROM info_list  WHERE userid = ${userid}`, [], (result, error) => {
            res.json({
                data: result,
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



module.exports = router;