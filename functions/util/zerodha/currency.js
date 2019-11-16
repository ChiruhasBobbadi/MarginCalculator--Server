const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');



function kite_call(){
    kite_json="";
    new_json=[];
    request.get("https://api.kite.trade/margins/currency", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }

        try{
            body = body.trim();
            kite_json = (JSON.parse(body));

            kite_json.forEach(element => {
                new_json.push({nrml:Math.floor(element.nrml_margin),mis:Math.floor(element.mis_margin),co_lower:element.co_lower,co_upper:element.co_upper})
            });
            //console.log(new_json)
            call(new_json)
        }
        catch (e) {

        }

    });
    
}

function call(json) {

    data = [];

    new_json = 0;

    test = [];

    //json = kite_call()

    request('https://zerodha.com/margin-calculator/Currency/', (error, response, html) => {

        if (!error && response.statusCode === 200) {

            const $ = cheerio.load(html);

            const heading = $('#table tbody tr td').each((i, el) => {

                const value = $(el).text();
                const key = $(el).attr("class");

                if (key.trim() !== 'calc' && key.trim() !== 'n' && key.trim()!=='nrml' && key.trim()!=='mis') {
               
                    data.push(value.trim())
                }


                if (key.trim() === 'calc') {
                    
                    temp = json.shift();
                    //console.log(data)
                    // convert to json
                    test.push({ scrip: data[0], expiry: data[1], lot: data[2], price: data[3],nrml:temp.nrml,mis:temp.mis,co_lower:temp.co_lower,co_upper:temp.co_upper});

                    data = []
                   
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




exports.call = kite_call;