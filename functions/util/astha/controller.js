const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


 module.exports.commodity =function (){
    const keys = ['scrip', 'expiry', 'price', 'lot', 'mwpl', 'mis', 'nrml', 'calc'];

    let data = [];


    let test = [];

    let cnt = 1;

    request('https://asthatrade.com/site/mcxmargin', (error, response, html) => {

        if (!error && response.statusCode === 200) {


            const $ = cheerio.load(html);

            $('.ex1  .datatable tbody tr td').each((i, el) => {


                cnt = i % 8;


                const key = keys[cnt];

                if (key !== 'calc' ) {

                    const value = $(el).text();
                    //console.log(key+":"+value);
                    data.push(value.trim());

                } else  {
                    // convert to json
                    test.push({
                        'scrip': data[0],
                        'expiry': data[1],
                        'price': data[2],
                        'lot': data[3],
                        'mwpl':data[4],
                        'mis': data[5],
                        'nrml': data[6],

                    });


                    data = []

                }



            });

            let new_json = JSON.stringify(test);

            fs.writeFile(path.join(__dirname, "../","../","../", "functions", "files","astha", "commodity.json"), new_json, (err) => {
                if (err)
                    console.log(err);
                else
                    console.log("astha commodity file created\n" + new Date())
            })
        }


    });

};

 // commodity()

module.exports.equity=function(){
    const keys = ['scrip', 'mis_multiplier', 'nrml_multiplier', 'calc'];

    let data = [];

    let test = [];

    let cnt = 1;

    request('https://asthatrade.com/site/margin', (error, response, html) => {

        if (!error && response.statusCode === 200) {


            const $ = cheerio.load(html);

            $('.ex1  .datatable tbody tr td').each((i, el) => {


                cnt = i % 4;


                const key = keys[cnt];




                if (key !== 'calc') {

                    const value = $(el).text();

                    if(key==='mis_multiplier'|| key==='nrml_multiplier')
                        data.push(value.match(/(\d+)/)[0]);
                    else
                        data.push(value.trim())

                } else if (key === 'calc') {

                    // convert to json
                    test.push({
                        'tradingsymbol': data[0],
                        'mis_multiplier': data[1],
                        'nrml_multiplier': data[2]
                    });


                    data = []

                }



            });

            let new_json = JSON.stringify(test);

            fs.writeFile(path.join(__dirname, "../","../","../", "functions", "files","astha", "equity.json"), new_json, (err) => {
                if (err)
                    console.log(err);
                else
                    console.log("astha equity file created\n" + new Date())
            })
        }


    });

};

module.exports.futures=function() {

    const keys = ['scrip', 'lot','mwpl', 'price', 'mis', 'op_mis', 'nrml', 'calc'];

    let data = [];

    let test = [];

    let cnt = 0;

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


                cnt = i % 8;
                const key = keys[cnt];
                if (key !== 'calc') {

                    let value = $(el).text();


                     if(key.trim()==='mwpl'){
                        console.log(value);
                        data.push(value.trim().split(",").join(""));
                    }

                    else
                        data.push(value.trim());

                }
                else if(key.trim()==='calc')  {

                    // convert to json
                    test.push({
                        'scrip': data[0],
                        'lot':data[1],
                        'price':data[2],
                        'mwpl':data[3],
                        'mis':data[4],
                        'op_mis':data[5],
                        'nrml':data[6],
                        'expiry':expiry
                    });


                    data = []

                }


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

};


