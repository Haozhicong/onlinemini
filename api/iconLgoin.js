const express = require('express');
const router = express.Router();
const db = require("../utils/db");
const axios = require('axios')
// 导入配置信息
const appInfo = require('../utils/wxApp')
// console.log(appInfo)
// 登录接口
router.get('/iconLogin', (req, res, next) => {
    // 接收前台传来的参数
    const code = req.query.code;
    const wxapi = `https://api.weixin.qq.com/sns/jscode2session?appid=${appInfo.AppID}&secret=${appInfo.AppSecret}&js_code=${code}&grant_type=authorization_code`
    axios.get(wxapi)
        .then(response => {
            let openid = response.data.openid;
            let queryRes;
            // 先查询在不在  不在就插入openid   反之则 直接返回userid
            db.query(`SELECT count(openid) FROM icon_user WHERE openid= '${openid}'`, [], (result, error) => {
                let results = result
                for (const key in results[0]) {
                    queryRes = results[0][key]
                }
                if (queryRes === 0) {
                    db.query(`INSERT INTO icon_user (openid) VALUES ('${openid}')`, [], (result, error) => {
                        console.log(result)
                        if (result.affectedRows != 1) {
                            throw error
                        }
                        db.query(`SELECT openid, userid FROM icon_user WHERE openid= '${openid}'`, [], (result, error) => {
                            if (result[0].openid === openid) {
                                res.json({
                                    message: "登录成功！",
                                    code: 200,
                                    userid: result[0].userid
                                })
                            } else {
                                throw error
                            }
                        })
                    })

                } else {
                    db.query(`SELECT openid, userid FROM icon_user WHERE openid= '${openid}'`, [], (result, error) => {
                        if (result[0].openid === openid) {
                            res.json({
                                message: "登录成功！",
                                code: 200,
                                userid: result[0].userid
                            })
                        } else {
                            throw error
                        }
                    })
                }
            })
        })
        .catch(error => {
            console.log(error);
        });
})
module.exports = router;