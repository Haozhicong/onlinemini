var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios')
// 解析表单的body-parser
const bodyParser = require('body-parser')
// 首页路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// api接口
const appApi = require('./api/iconLgoin')
const iconFb = require('./api/iconFb')
const iconHome = require('./api/iconHome')
const iconSearch = require('./api/iconSearch')
const iconGetList = require('./api/iconGetList')

var app = express();

//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 使用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', appApi)
app.use('/api', iconFb)
app.use('/api', iconHome)
app.use('/api', iconSearch)
app.use('/api', iconGetList)


// 使用axios
app.use(axios)
app.use(bodyParser.urlencoded({
    extended: false
}))
// 解析req.body
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;