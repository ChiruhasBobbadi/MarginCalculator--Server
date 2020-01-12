const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


module.exports.commodity = function () {

    try {
        let data = [];
        let test = [];
        request('https://asthatrade.com/site/mcxmargin', (error, response, html) => {

            if (!error && response.statusCode === 200) {

                const $ = cheerio.load(html);

                $('.ex1  .datatable tbody tr td').each((i, el) => {

                    if (data.length === 7) {
                        test.push({
                            'scrip': data[0],
                            'expiry': data[1],
                            'price': data[2],
                            'lot': data[3],
                            'mwpl': data[4],
                            'mis': data[5],
                            'nrml': data[6],

                        });
                        data = [];

                        data.push($(el).text().trim())

                    } else {
                        const value = $(el).text();


                        data.push(value.trim())
                    }

                });
                test.push({
                    'scrip': data[0],
                    'expiry': data[1],
                    'price': data[2],
                    'lot': data[3],
                    'mwpl': data[4],
                    'mis': data[5],
                    'nrml': data[6],

                });


                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "astha", "commodity.json"), new_json, (err) => {
                    if (err)
                        console.log(err);
                    else
                        console.log("astha commodity file created\n" + new Date())
                })
            }


        });
    } catch (e) {
        console.log("exception occured in astha commodity");
    }


};
//module.exports.commodity();

//module.exports.commodity();

/*module.exports.equity = function () {
// function equity(){
    try {
        let data = [];
        let test = [];
        request('https://asthatrade.com/site/margin', (error, response, html) => {
            if (!error && response.statusCode === 200) {
                const $ = cheerio.load(html);
                let expiry = "";
                $('.filters th input').each((i, el) => {
                    if (i === 1) {
                        expiry = $(el).attr('placeholder').split(":")[1].trim();
                    }
                });
                $('.ex1  .datatable tbody tr td').each((i, el) => {
                    if (data.length === 4) {
                        //console.log(data[2].substring(data[2].indexOf('(') + 1, data[2].indexOf(')')).trim());
                        test.push({
                            'tradingsymbol': data[0],
                            //'mis_multiplier': data[2].match(/(\d+)/)[0],
                            'mis_multiplier': data[2].match(/(\d+)/)[0],
                            'nrml_multiplier': data[3].match(/(\d+)/)[0]
                        });
                        data = [];
                        data.push($(el).text().trim())
                    } else {
                        const value = $(el).text();
                        data.push(value.trim())
                    }
                });

                test.push({
                    'tradingsymbol': data[0],
                    'mis_multiplier': data[2].match(/(\d+)/)[0],
                    'nrml_multiplier': data[3].match(/(\d+)/)[0]
                });
                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "astha", "equity.json"), new_json, (err) => {
                    if (err)
                        console.log(err);
                    else
                        console.log("astha equity file created\n" + new Date())
                })
            }


        });

    } catch (e) {
        console.log("exception occured in astha equity");
    }

};*/
// module.exports.equity()

module.exports.futures = function () {
    try {
        let data = [];
        let test = [];
        request('https://asthatrade.com/site/nsefo', (error, response, html) => {

            if (!error && response.statusCode === 200) {


                const $ = cheerio.load(html);
                let expiry = "";


                $('.filters th input ').each((i, el) => {

                    if (i === 1) {
                        expiry = $(el).attr('placeholder').split(":")[1].trim();
                    }

                });


                $('.ex1  .datatable tbody tr td').each((i, el) => {


                    if (data.length === 7) {


                        test.push({
                            'scrip': data[0],
                            'lot': data[1],
                            'price': data[2],
                            'mwpl': data[3],
                            'mis': data[4],
                            'op_mis': data[5],
                            'nrml': data[6],
                            'expiry': expiry
                        });
                        data = [];


                        data.push($(el).text().trim())
                    } else {
                        const value = $(el).text();


                        data.push(value.trim())
                    }


                });

                test.push({
                    'scrip': data[0],
                    'lot': data[1],
                    'price': data[2],
                    'mwpl': data[3],
                    'mis': data[4],
                    'op_mis': data[5].split("  ")[0],
                    'nrml': data[6],
                    'expiry': expiry
                });
                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "astha", "futures.json"), new_json, (err) => {
                    if (err)
                        console.log(err);
                    else
                        console.log("astha future file created\n" + new Date())
                })
            }


        });
    } catch (e) {
        console.log("exception occured in astha equity");
    }


};
 // module.exports.futures();

