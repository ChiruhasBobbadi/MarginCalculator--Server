const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


module.exports.commodity = () => {


        let data = [];
        let test = [];
    request('https://asthatrade.com/site/mcxmargin', (error, response, html) => {
        try {
            if (!error && response.statusCode === 200) {

                const $ = cheerio.load(html);

                $('.ex1  .datatable tbody tr td').each((i, el) => {

                    if (data.length === 7) {
                        test.push({
                            'scrip': data[0],
                            'expiry': data[1],
                            'price': data[3],
                            'lot': data[2],
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
                    'price': data[3],
                    'lot': data[2],
                    'mwpl': data[4],
                    'mis': data[5],
                    'nrml': data[6],

                });


                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "astha", "commodity.json"),
                    new_json, (err) => {
                    if (err)
                        console.log(err);

                })
            }


        } catch (e) {
            console.log("exception occured in astha commodity "+e );
            }


        });



};


module.exports.equity = () => {

//const equity = ()=>{
    let data = [];
        let test = [];
        request('https://asthatrade.com/site/margin', (error, response, html) => {
            try {
                if (!error && response.statusCode === 200) {
                    const $ = cheerio.load(html);

                    $('.ex1  .datatable tbody tr td').each((i, el) => {

                        if (data.length === 5) {

                            // for nrml+mis
                            test.push({
                                'tradingsymbol': data[0],
                                'mis_multiplier': data[3].match(/(\d+)/)[0],
                                'nrml_multiplier': data[4].match(/(\d+)/)[0]
                            });
                            data = [];


                            data = [];


                            data.push($(el).text().trim())
                        } else {
                            const value = $(el).text();
                            data.push(value.trim())
                        }
                    });




                    test.push({
                        'tradingsymbol': data[0],
                        'mis_multiplier': data[3].match(/(\d+)/)[0],
                        'nrml_multiplier': data[4].match(/(\d+)/)[0]
                    });

                    let new_json = JSON.stringify(test);

                    fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "astha", "equity.json"), new_json, (err) => {
                        if (err)
                            console.log(err);
                        else
                            console.log("astha equity file created\n" + new Date())
                    })
                }
            } catch (e) {
                console.log("exception occured in astha equity");
            }



        });


};




module.exports.futures = () => {
//  const futures =()=>{
    try {
        let data = [];
        let test = [];
        request('https://asthatrade.com/site/nsefo', (error, response, html) => {

            if (!error && response.statusCode === 200) {


                const $ = cheerio.load(html);


                $('.ex1 .datatable tbody tr td').each((i, el) => {


                    if (data.length === 6) {


                        test.push({
                            'scrip': data[0],
                            'expiry': data[1],
                            'lot': data[2],
                            'price': data[3],
                            'mis': data[4],
                            'nrml': data[5]
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
                    'lot': data[2],
                    'price': data[3],
                    'mis': data[4],
                    'nrml': data[5]
                });
                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "astha", "futures.json"),
                    new_json, (err) => {
                    if (err)
                        console.log(err);

                })
            }


        });
    } catch (e) {
        console.log("exception occured in astha futures");
    }


};




module.exports.currency = () => {
    try {
        let data = [];
        let test = [];
        request('https://asthatrade.com/site/currency', (error, response, html) => {

            if (!error && response.statusCode === 200) {
                const $ = cheerio.load(html);
                $('.ex1 .datatable tbody tr td').each((i, el) => {
                    if (data.length === 7) {
                        test.push({
                            'scrip': data[0],
                            'expiry': data[1],
                            'lot': data[2],
                            'price': data[3],
                            'mis': data[4],
                            'op_mis': data[5],
                            'nrml': data[6]
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
                    'lot': data[2],
                    'price': data[3],
                    'mis': data[4],
                    'op_mis': data[5],
                    'nrml': data[6]
                });
                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "astha", "currency.json"), new_json, (err) => {
                    if (err)
                        console.log(err);
                })
            }


        });
    } catch (e) {
        console.log("exception occured in astha currency");
    }

};

