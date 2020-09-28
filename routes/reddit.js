var express = require('express');
var router = express.Router();
let scraps = require("../user_modules/reddit.js");
let schedule = require("node-schedule");
let fs = require("fs");
let path = require("path");
let database = require(path.resolve(__dirname, "../user_modules/database.js"));



router.get("/", function (req, res, next) {
    database.get_scraps(function (row, c) {
        console.log(row);
        let showed_scraps = fs.readFileSync(path.resolve(__dirname,
            "../public/jsons/reddit/showed_scraps.json"),
            "utf8");
        res.render("reddit");
    });
});


module.exports = router;
