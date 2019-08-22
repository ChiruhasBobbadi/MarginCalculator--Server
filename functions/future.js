// const cheerio = require('cheerio')
// const fs = require('fs')

 const request = require('request');
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

function kite_call(){
    kite_json=""
    new_json=[]
    request.get("https://api.kite.trade/margins/futures", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        kite_json = (JSON.parse(body));

        kite_json.forEach(element => {
            new_json.push({co_lower:element.co_lower,co_upper:element.co_upper,margin:element.margin,mis_multiplier:element.mis_multiplier})
        });
        //console.log(new_json)
        call(new_json)
    });
    
}

function call(json){
    
    data = []   

    new_json = 0

    test = []

    request('https://zerodha.com/margin-calculator/Futures/',(error,response,html)=>{

        if(!error && response.statusCode === 200){
            
         
            const $ = cheerio.load(html);
        
            const heading =$('#table tbody tr td').each((i,el)=>{
        
                const value = $(el).text();
                const key = $(el).attr("class");

                if (key.trim() !== 'calc' && key.trim() !== 'n') {
               
                    data.push(value.trim())
                }
                else if (key.trim() === 'calc') {
                    temp = json.shift();
                    // convert to json
                    test.push({ scrip: data[0],expiry:data[1], lot: data[2], price: data[3], nrml: data[4],mis:data[5],mwpl:data[6],co_lower:temp.co_lower,co_upper:temp.co_upper,margin:temp.margin,mis_multiplier:temp.mis_multiplier})

                    data = []
                    
                 }
        
        
               
           
                //json.push({price:price})
            })

            new_json = JSON.stringify(test)
            
            fs.writeFile(path.join(__dirname,"../","functions","files","futures.json"), new_json, (err) => {
                if (err)
                    console.log(err)
                else
                    console.log("Future file created")
            })


                
                   
        }
        
           
        
        
        })
        
}





// //call()
// kite_call()

// //console.log(arr)


exports.call = kite_call



	
	
	
