const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/*
module.exports.commodity = () => {


    let data = [];
    let test = [];
    request('https://www.aliceblueonline.com/margin-calculator/', (error, response, html) => {
        try {
            if (!error && response.statusCode === 200) {

                const $ = cheerio.load(html);

                $('#employee_data tbody tr td').each((i, el) => {

                    if (data.length === 9) {
                        test.push({
                            'scrip': data[1],
                            'lot': data[2],
                            'price': data[3],
                            'nrml':data[4],
                            'mis':data[5]==='NIL'?0:data[5] ,
                            'co_margin':data[6],
                            'bo_margin':data[7]

                        });
                        data = [];

                        data.push($(el).text().trim())

                    } else {
                        const value = $(el).text();

                        data.push(value.trim())

                    }

                });
                test.push({
                    'scrip': data[1],
                    'lot': data[2],
                    'price': data[3],
                    'nrml':data[4],
                    'mis':data[5]==='NIL'?0:data[5] ,
                    'co_margin':data[6],
                    'bo_margin':data[7]

                });


                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "alice", "commodity.json"), new_json, (err) => {
                    if (err)
                        console.log(err);
                    else
                        console.log("alice commodity file created\n" + new Date())
                })
            }


        } catch (e) {
            console.log("exception occured in alice commodity "+e );
        }


    });



};*/


module.exports.equity = () => {

    let data = [];
    let test = [];
    request('https://www.samco.in/span/equity', (error, response, html) => {
        try {
            if (!error && response.statusCode === 200) {
                const $ = cheerio.load(html);

                $('#equity_table tbody tr td').each((i, el) => {
                    // if nrml+mis length==4 || length == 3
                    if (data.length === 5) {
                        // for nrml+mis
                        test.push({
                            'tradingsymbol': data[1],
                            'mis_multiplier': data[3].replace('x', ''),
                            'nrml_multiplier': data[2].replace('x', '')
                        });
                        data = [];
                        data.push($(el).text().trim())
                    } else {
                        const value = $(el).text();
                        data.push(value.trim())
                    }
                });

                test.push({
                    'tradingsymbol': data[1],
                    'mis_multiplier': data[3].replace('x', ''),
                    'nrml_multiplier': data[2].replace('x', '')
                });

                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "samco", "equity.json"),
                    new_json, (err) => {
                        if (err)
                            console.log(err);
                    })
            }
        } catch (e) {
            console.log("exception occured in alice equity");
        }


    });


};


module.exports.futures = () => {

// const futures = ()=>{
    try {
        let data = [];
        let test = [];
        request('https://www.samco.in/span/margin-calculator-nfo', (error, response, html) => {

            if (!error && response.statusCode === 200) {


                const $ = cheerio.load(html);


                $('#equity_table tbody tr td').each((i, el) => {


                    if (data.length === 9) {


                        test.push({
                            'scrip': data[1],
                            'expiry': data[2],
                            'lot': data[3].replace("[]", "").trim(),
                            'price': data[4],
                            'nrml': data[5].replace(',', ''),
                            'mis': data[6],
                            'co_margin': data[7],
                            'bo_margin': data[7]
                        });
                        data = [];


                        data.push($(el).text().trim())
                    } else {
                        const value = $(el).text();
                        data.push(value.trim())

                    }


                });

                test.push({
                    'scrip': data[1],
                    'expiry': data[2],
                    'lot': data[3].replace("[]", "").trim(),
                    'price': data[4],
                    'nrml': data[5].replace(',', ''),
                    'mis': data[6],
                    'co_margin': data[7],
                    'bo_margin': data[7]
                });
                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "samco", "futures.json"), new_json, (err) => {
                    if (err)
                        console.log(err);
                })
            }


        });
    } catch (e) {
        console.log("exception occured in alice futures");
    }


};


module.exports.currency = () => {
// const currency = ()=>{
    try {
        let data = [];
        let test = [];
        request('https://www.samco.in/span/margin-calculator-cds', (error, response, html) => {

            if (!error && response.statusCode === 200) {
                const $ = cheerio.load(html);
                $('#equity_table tbody tr td').each((i, el) => {
                    if (data.length === 9) {
                        test.push({
                            'scrip': data[1],
                            'expiry': data[2],
                            'lot': data[3].replace("[]", "").trim(),
                            'price': data[4],
                            'nrml': data[5],
                            'mis': data[6]
                        });
                        data = [];
                        data.push($(el).text().trim())
                    } else {
                        const value = $(el).text();
                        data.push(value.trim())

                    }


                });

                test.push({
                    'scrip': data[1],
                    'expiry': data[2],
                    'lot': data[3].replace("[]", "").trim(),
                    'price': data[4],
                    'nrml': data[5],
                    'mis': data[6]
                });
                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "samco", "currency.json"),
                    new_json, (err) => {
                        if (err)
                            console.log(err);

                    })
            }


        });
    } catch (e) {
        console.log("exception occured in alice currency");
    }

};

// currency();

