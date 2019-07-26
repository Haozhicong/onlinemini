var express = require('express');
var router = express.Router();

const db = require("../utils/db")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Hello Express")
});

module.exports = router;