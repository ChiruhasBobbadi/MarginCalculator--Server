const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


// module.exports.mmi = async () => {

 function mmi(){

    request('https://www.tickertape.in/market-mood-index', (error, response, html) => {

        try {
            if (!error && response.statusCode === 200) {

                const $ = cheerio.load(html);

                console.log($('.jsx-3758077420 .jsx-112727373 .number').html());


                /* fs.writeFile(path.join(__dirname, "../", "../", "../", "functions", "files", "mmi", "mmi.json"), '', (err) => {
                     if (err)
                         console.log(err);
                     else
                         console.log("astha commodity file created\n" + new Date())
                 })*/
            }


        } catch (e) {
            console.log("exception occured in astha commodity " + e);
        }



})

}


mmi();
