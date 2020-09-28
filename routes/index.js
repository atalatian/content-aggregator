var express = require('express');
var router = express.Router();
let categories = require("../user_modules/categories.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.removeHeader("Content-Type");
    res.setHeader("Content-Type", "text/html");
    res.render('index', { title: 'Express', categories: categories });
});

module.exports = router;
