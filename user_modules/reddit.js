const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;




const vgmUrl= 'https://www.reddit.com/';
let records = {}

let request = function(){
    got(vgmUrl).then(response => {
        let main_dom = null;
        main_dom = new JSDOM(response.body);
        let thread = main_dom.window.document.querySelector(".rpBJOHq2PR60pnwJlUyP0").innerHTML;
        let dom_x = new JSDOM(thread);
        let articles = dom_x.window.document.body;
        let articles_body = articles.querySelectorAll("._1poyrkZ7g36PawDueRza-J");
        let counter = 0;
        articles_body.forEach(function (selected_div) {
            if (selected_div.querySelector("._eYtD2XCVieq6emjKBH3m")){
                if (selected_div.querySelector("._2_tDEnGMLxpM6uOa2kaDB3")) {
                    var image = selected_div.querySelector("._2_tDEnGMLxpM6uOa2kaDB3").src;
                }else {
                    var image = null
                }
                let title = selected_div.querySelector("._eYtD2XCVieq6emjKBH3m").innerHTML
                for (let i=0; i<10; i++){
                    title = title.replace("\'", "*");
                }
                records[counter] = {
                    title: title,
                    link: "https://www.reddit.com" +  selected_div.querySelector(".SQnoC3ObvgnGjWt90zD9Z").href,
                    image: image,
                }
                counter += 1;
            }
        })
    }).catch(err => {
        console.log(err);
    });
}



module.exports = {
    func: request,
    records: records,
};


