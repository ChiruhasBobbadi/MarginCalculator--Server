const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');



    function kite_call() {
        let kite_json = "";
        let new_json = [];
        request.get("https://api.kite.trade/margins/commodity", (error, response, body) => {
            try {
                if (!error && response.statusCode === 200) {
                    body = body.trim();
                    kite_json = (JSON.parse(body));

                    kite_json.forEach(element => {
                        new_json.push({
                            co_lower: element.co_lower,
                            co_upper: element.co_upper
                        })
                    });
                    // console.log(new_json)
                    call(new_json)
                }
            } catch (e) {
                console.log("exception in zerodha commodity" + new Date().getDate());
            }





        });

    }

    function call(json) {



        let new_json = 0;

        let test = [];

        //json = kite_call()

        request('https://zerodha.com/margin-calculator/Commodity/', (error, response, html) => {

            if (!error && response.statusCode === 200) {

                const $ = cheerio.load(html);

                $('#table tbody tr').each((i, el) => {

                    test.push({
                        scrip: $(el).data('scrip'),
                        lot: $(el).find($("td div span")).text().trim(),
                        price: $(el).data('price'),
                        nrml: $(el).data('nrml_margin'),
                        mis: $(el).data('mis_margin'),

                        // co_lower: temp.co_lower,
                        // co_upper: temp.co_upper
                    });

                });

                test = test.map((obj, index) => ({
                    ...obj,
                    co_lower: json[index].co_lower,
                    co_upper: json[index].co_upper
                }));
                new_json = JSON.stringify(test);
                console.log(new_json);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "zerodha", "commodity.json"), new_json, (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log("zerodha Commodity file created \n" + new Date())
                    }

                })


            }
        })


    }


exports.call = kite_call;

//module.exports.call();