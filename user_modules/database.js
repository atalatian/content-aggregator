const pg = require('pg');
const client = new pg.Client({
    user: "ujodladagkguwr",
    host: 'ec2-54-158-122-162.compute-1.amazonaws.com',
    database: "d43j6lgcq3boag",
    password: "7caf0cddb571bae9e9a0a76a4ed4a465630ca3a40d06dee21ec3d7327cb21bd2",
    port: 5432,
});

try {
    client.connect();
}catch (e) {
    console.log(e.message);
}

function get_scraps(func) {
    client.query("SELECT * FROM scraps").then(function (res) {
        func(res.rows[0], client);
    });
}


function insert_scraps(json, func) {
    client.query("INSERT INTO scraps(reddit_scraps) VALUES (" + `'${json}'` + ")").then(function () {
        func(client);
    })
}

function delete_scraps(func) {
    client.query("DELETE FROM scraps").then(function () {
        func(client);
    })
}


module.exports = {
    "get_scraps": get_scraps,
    "insert_scraps": insert_scraps,
    "delete_scraps": delete_scraps,
}
