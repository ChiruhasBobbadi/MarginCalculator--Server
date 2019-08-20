const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')    
const path = require('path')



// function kite_call(){
//     kite_json=""
//     _json=[]
//     request.get("https://api.kite.trade/margins/commodity", (error, response, body) => {
//         if(error) {
//             return console.dir(error);
//         }
//         kite_json = (JSON.parse(body));

//         kite_json.forEach(element => {
//             _json.push({co_lower:element.co_lower,co_upper:element.co_upper})
//         });
        
//     });
    
//     return new_json
// }

function call() {

    data = []

    json = []

    new_json = 0

    test = []

    //json = kite_call()

    request('https://zerodha.com/margin-calculator/Commodity/', (error, response, html) => {

        if (!error && response.statusCode === 200) {

            const $ = cheerio.load(html);

            const heading = $('#table tbody tr td').each((i, el) => {

                const value = $(el).text();
                const key = $(el).attr("class");

                if (key.trim() !== 'calc' && key.trim() !== 'n') {
               
                    data.push(value.trim())
                }


                if (key.trim() === 'mis') {
                    
                    temp = json.shift();
                    // convert to json
                    test.push({ scrip: data[0], lot: data[1], price: data[2], nrml: data[3], mis: data[4],temp})

                    data = []
                   
                }


            })
           

            new_json = JSON.stringify(test)
            
            fs.writeFile(path.join(__dirname,"../","public","files","commodity.json"), new_json, (err) => {
                if (err)
                    console.log(err)
                else
                    console.log("File created")
            })



        }


    })


}


exports.call = call;