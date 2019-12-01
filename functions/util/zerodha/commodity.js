const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


try{
    function kite_call() {
        kite_json = "";
        new_json = [];
        request.get("https://api.kite.trade/margins/commodity", (error, response, body) => {
            if (error) {
                return console.dir(error);
            }


            body = body.trim();
            kite_json = (JSON.parse(body));

            kite_json.forEach(element => {
                new_json.push({co_lower: element.co_lower, co_upper: element.co_upper})
            });
            //console.log(new_json)
            call(new_json)


        });

    }

    function call(json) {

        data = [];

        new_json = 0;

        test = [];

        //json = kite_call()

        request('https://zerodha.com/margin-calculator/Commodity/', (error, response, html) => {

            if (!error && response.statusCode === 200) {

                const $ = cheerio.load(html);

                $('#table tbody tr td').each((i, el) => {

                    const value = $(el).text();
                    const key = $(el).attr("class");

                    if (key.trim() !== 'calc' && key.trim() !== 'n') {

                        data.push(value.trim())
                    }


                    if (key.trim() === 'calc') {


                        if(json.length!==0)
                            temp = json.shift();
                        // convert to json

                        test.push({
                            scrip: data[0],
                            lot: data[1],
                            price: data[2],
                            nrml: data[3],
                            mis: data[4],

                            co_lower: temp.co_lower,
                            co_upper: temp.co_upper
                        });

                        data = []

                    }


                });


                new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../","../","../", "functions", "files","zerodha", "commodity.json"), new_json, (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log("zerodha Commodity file created \n" + new Date())
                    }

                })


            }


        })


    }

}
catch (e) {
    console.log("exception in zerodha commodity" + new Date().getDate());
}


exports.call = kite_call;