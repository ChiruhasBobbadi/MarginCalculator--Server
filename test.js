const request = require('request')

request.get("https://api.kite.trade/margins/commodity", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        kite_json = (JSON.parse(body));

        // kite_json.forEach(element => {
        //     new_json.push({co_lower:element.co_lower,co_upper:element.co_upper})
        // });
        console.log(kite_json)
        
    });