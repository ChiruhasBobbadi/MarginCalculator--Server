// const cheerio = require('cheerio')
// const fs = require('fs')

// const request = require('request');


// function kite_call(){
//     kite_json=""
//     _json=[]
//     request.get("https://api.kite.trade/margins/futures", (error, response, body) => {
//         if(error) {
//             return console.dir(error);
//         }
//         kite_json = (JSON.parse(body));

//         kite_json.forEach(element => {
//             _json.push(element)
//         });

//         console.log(_json)
        
//     });
    
//     return _json
// }

// function call(){
// json =[]

//     request('https://zerodha.com/margin-calculator/Futures/',(error,response,html)=>{

//         if(!error && response.statusCode === 200){
            
         
//             const $ = cheerio.load(html);
        
//             const heading =$('#table tbody tr').each((i,el)=>{
        
//                 //const value = $(el).html();
//                 const price = $(el).attr("data-price");
        
        
//                 console.log(price)
           
//                 json.push({price:price})
//             })
            
                
                   
//         }
        
           
        
        
//         })
        
// }



// //call()
// kite_call()

// //console.log(arr)






	
	
	
