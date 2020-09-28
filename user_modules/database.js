const pg = require('pg');
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

try {
    client.connect();
}catch (e) {
    console.log(e.message);
}

try {
    client.query("DROP TABLE scraps");
    console.log("Table deleted.");
}catch (e) {
    console.log("First Launch");
}

client.query("CREATE TABLE scraps(reddit_scraps json, time_scraps json)").then(function (res) {
    console.log("Table created.");
})


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
