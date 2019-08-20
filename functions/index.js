
const express = require('express')
const commodity_route = require('./routes/commodity_routes')
//const future_route = require('../routes/futures_routes')
const commodity = require('./commodity')

const cron =require("node-cron")



cron.schedule("00 19 * * *", () => {
    console.log(`function is called now`);
     commodity.call()

  });


 
  const app = express()

   
    
 //app.use(commodity_route)

 app.use('/',(req,res)=>{
   res.send("Hello")
 })

     


    


app.listen(3000)