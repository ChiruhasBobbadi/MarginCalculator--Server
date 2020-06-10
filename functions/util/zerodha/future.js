const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

try {
    function kite_call() {
        let kite_json = "";
        let new_json = [];
        request.get("https://api.kite.trade/margins/futures", (error, response, body) => {


            if(!error && response.statusCode===200){
                try {
                    body = body.trim();
                    kite_json = (JSON.parse(body));

                    new_json = kite_json.map(element => {
                        return {
                            co_lower: element.co_lower,
                            co_upper: element.co_upper,
                            margin: element.margin,
                            mis: element.mis_margin
                        }
                    });
                    //console.log(new_json)
                    call(new_json)
                } catch (e) {
                    console.log("Exception in zerodha futures");
                }
            }





        });

    }

    function call(json) {



        let new_json = 0;


        request('https://zerodha.com/margin-calculator/Futures/', (error, response, html) => {

            if (!error && response.statusCode === 200) {


                const $ = cheerio.load(html);

                new_json = json.map((obj, index) =>({
                        scrip: $(`#entry-${index + 1}`).data('scrip'),
                        expiry: $(`#entry-${index + 1}`).data('expiry'),
                        lot: $(`#entry-${index + 1}`).data('lot_size'),
                        price: $(`#entry-${index + 1}`).data('price'),
                        nrml: $(`#entry-${index + 1}`).data('nrml_margin'),
                        mis: Math.round(obj.mis),
                        co_lower: obj.co_lower,
                        co_upper: obj.co_upper,
                        margin: obj.margin,
                        mis_multiplier: obj.mis_multiplier
                    })
                );

                new_json = JSON.stringify(new_json);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "zerodha", "futures.json"), new_json, (err) => {
                    if (err)
                        console.log(err);
                    else
                        console.log("zerodha Future file created\n" + new Date())
                })


            }


        })

    }

    //kite_call();
} catch (e) {
    console.log("exception in zerodha futures" + new Date().getDate());
}


exports.call = kite_call;


	
	
	
