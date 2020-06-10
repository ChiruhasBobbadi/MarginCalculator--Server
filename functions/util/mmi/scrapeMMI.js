const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


module.exports.mmi = () => {
    request('https://www.tickertape.in/market-mood-index', (error, response, html) => {

        try {
            if (!error && response.statusCode === 200) {

                const $ = cheerio.load(html);

                const mmi = $('.jsx-3758077420 .jsx-112727373 .number').html();

                const obj = {'mmi': mmi};


                fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "mmi", "mmi.json"), JSON.stringify(obj), (err) => {
                     if (err)
                         console.log("error writing mmi file");

                })
            }


        } catch (e) {
            console.log("exception occured in astha commodity " + e);
        }



})

};
