const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

try {
    function kite_call() {
        let kite_json = "";
        let map = new Map();
        request.get("https://api.kite.trade/margins/futures", (error, response, body) => {


            if(!error && response.statusCode===200){
                try {
                    body = body.trim();
                    kite_json = (JSON.parse(body));

                    kite_json.map(element => {
                        // return {
                        //     co_lower: element.co_lower,
                        //     co_upper: element.co_upper,
                        //     margin: element.margin,
                        //     mis: element.mis_margin,
                        //     tradingsymbol:element.tradingsymbol
                        // }

                        let index = 0;
                        for (let i = 0; i < element.tradingsymbol.length; i++) {
                            if (isCharDigit(element.tradingsymbol.charAt(i))) {
                                index = i;
                                break;
                            }
                        }

                        function isCharDigit(n) {
                            return !!n.trim() && n > -1;
                        }

                        let o = {
                            co_lower: element.co_lower,
                            co_upper: element.co_upper
                        };

                        if (!map.has(
                            element.tradingsymbol.substr(0, index),
                        ))
                            map.set(element.tradingsymbol.substr(0, index), o);

                    });
                    const avg_co_lower = kite_json.reduce((sum, json) => sum + json.co_lower, 0) / kite_json.length;
                    const avg_co_upper = kite_json.reduce((sum, json) => sum + json.co_upper, 0) / kite_json.length;

                    //console.log(avg_co_upper.toFixed(2));

                    call(map, avg_co_lower.toFixed(2), avg_co_upper.toFixed(2));
                } catch (e) {
                    console.log("Exception in zerodha futures");
                }
            }





        });


    }

    function call(map, lower, upper) {


        let new_json = [];


        request('https://zerodha.com/margin-calculator/Futures/', (error, response, html) => {

            if (!error && response.statusCode === 200) {


                const $ = cheerio.load(html);

                const calculateMis = (nrml, mis) => Math.floor((parseFloat(nrml) * (100 - parseFloat(mis))) / 100);


                $('#header-container table tbody tr').each((index, el) => {


                    const coLower = scrip => map.has(scrip) ? map.get(scrip).co_lower : lower;
                    const coUpper = scrip => map.has(scrip) ? map.get(scrip).co_upper : upper;

                    new_json.push({
                        scrip: $(`#entry-${index + 1}`).data('scrip'),
                        expiry: $(`#entry-${index + 1}`).data('expiry'),
                        lot: $(`#entry-${index + 1}`).data('lot_size'),
                        price: $(`#entry-${index + 1}`).data('price'),
                        nrml: $(`#entry-${index + 1}`).data('nrml_margin'),
                        mis: calculateMis($(`#entry-${index + 1}`).data('nrml_margin'), $(el).data('margin')),
                        co_lower: coLower($(`#entry-${index + 1}`).data('scrip')),
                        co_upper: coUpper($(`#entry-${index + 1}`).data('scrip'))


                    });


                });

                new_json = JSON.stringify(new_json);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "zerodha", "futures.json"),
                    new_json, (err) => {
                    if (err)
                        console.log(err);

                })

            }


        })

    }

    //kite_call();
} catch (e) {
    console.log("exception in zerodha futures" + new Date().getDate());
}

exports.call = kite_call;


	
	
	
