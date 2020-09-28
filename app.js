var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require(__dirname + '/routes/index');
var redditRouter = require(__dirname + "/routes/reddit");
let schedule = require("node-schedule");
let scraps_reddit = require("./user_modules/reddit.js");
let fs = require("fs");
let database = require("./user_modules/database.js");


scraps_reddit.func();
let interval = setInterval(function () {
    if (Object.keys(scraps_reddit.records).length > 0){
        database.delete_scraps(function (c) {
            console.log("Delete Successful.");
        })
        let set = setInterval(function () {
            database.insert_scraps(JSON.stringify(scraps_reddit.records), function (c) {
                console.log("Insert Successful.");
                clearInterval(set);
            });
        },200);
        clearInterval(interval);
    }
},1000);



let j = schedule.scheduleJob("*/1 * * * *", function () {
    scraps_reddit.func();
    let interval = setInterval(function () {
        if (Object.keys(scraps_reddit.records).length > 0){
            database.delete_scraps(function (c) {
                console.log("Delete Successful.");
            })
            let set = setInterval(function () {
                database.insert_scraps(JSON.stringify(scraps_reddit.records), function (c) {
                    console.log("Insert Successful.");
                    clearInterval(set);
                });
            },200);
            clearInterval(interval);
        }
    },1000);
});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/Reddit', redditRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    next();
});





app.listen("5000");


module.exports = app;

//58a7ad1c-dd09-434c-a785-891015e38dec
//mongo "mongodb+srv://cluster0.2gm1r.gcp.mongodb.net/<dbname>" --username atalatian
//mongodb+srv://atalatian:<Amirhoseyn2014>@cluster0.2gm1r.gcp.mongodb.net/<categories>?retryWrites=true&w=majority