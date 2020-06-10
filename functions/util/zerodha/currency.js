const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


try{
    function kite_call(){
       let kite_json="";
       let new_json=[];
        request.get("https://api.kite.trade/margins/currency", (error, response, body) => {


            if(!error && response.statusCode===200){
                try{
                    body = body.trim();
                    kite_json = (JSON.parse(body));

                    kite_json.forEach(element => {

                        new_json.push({
                            scrip: splitScrip(element.tradingsymbol),
                            nrml: Math.floor(element.nrml_margin),
                            mis: Math.floor(element.mis_margin),
                            co_lower: element.co_lower,
                            co_upper: element.co_upper
                        })
                    });
                    //console.log(new_json);
                    call(new_json)
                }
                catch (e) {
                    console.log("Exception in zerodha currency");
                }
            }



        });

    }

    const splitScrip = (str) => {
        let s = '';

        for (let c of str) {
            if (!isDigit(c))
                s += c;
            else break;

        }
        return s;


    }
    const isDigit = (function () {
        var re = /^\d$/;
        return function (c) {
            return re.test(c);
        }
    }());

    function call(json) {

        let data = [];

        let new_json = 0;

        let test = [];

        //json = kite_call()

        request('https://zerodha.com/margin-calculator/Currency/', (error, response, html) => {

            if (!error && response.statusCode === 200) {

                const $ = cheerio.load(html);

                $('#table tbody tr').each((i, el) => {


                    test.push({
                        scrip: $(el).data('scrip'),
                        expiry: $(el).data('expiry'),
                        lot: $(el).data('lot_size'),
                        price: $(el).data('price'),

                    });


                });

                console.log(test);

                test = test.map(obj => {
                    let temp = json.filter(o => o.scrip === obj.scrip);
                    console.log(temp);
                    return {
                        ...obj,
                        nrml: temp[0].nrml,
                        mis: temp[0].mis,
                        co_lower: temp[0].co_lower,
                        co_upper: temp[0].co_upper
                    }
                });




                new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname,"../","../","../","functions","files","zerodha","currency.json"), new_json, (err) => {
                    if (err)
                        console.log(err);
                    else
                        console.log("zerodha Currency file created\n"+new Date())
                })



            }


        })


    }

}
catch (e) {
    console.log("exception in zerodha currency" + new Date().getDate());
}


exports.call = kite_call;

//module.exports.call();