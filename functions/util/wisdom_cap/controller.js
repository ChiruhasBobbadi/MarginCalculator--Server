const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


module.exports.equity = () => {
//    const equity = ()=>{
    let data = [];
    let test = [];
    request('https://wisdomcapital.in/equity-margin-requirements/', (error, response, html) => {
        try {
            if (!error && response.statusCode === 200) {
                const $ = cheerio.load(html);

                $('#tablepress-21 tbody tr td').each((i, el) => {
                    // if nrml+mis length==4 || length == 3
                    if (data.length === 5) {
                        // for nrml+mis
                        test.push({
                            'tradingsymbol': data[0],
                            'mis_multiplier': data[1].replace('x', '').replace('X', ''),
                            'nrml_multiplier': data[3].replace('x', '').replace('X', '')
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
                    'mis_multiplier': data[1].replace('x', '').replace('X', ''),
                    'nrml_multiplier': data[3].replace('x', '').replace('X', '')
                });

                let new_json = JSON.stringify(test);

                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "wisdom_cap", "equity.json"),
                    new_json, (err) => {
                        if (err)
                            console.log(err);
                    })
            }
        } catch (e) {
            console.log("exception occured in widom equity "+e);
        }


    });


};






