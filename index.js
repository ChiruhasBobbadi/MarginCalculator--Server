
const express = require('express')
const commodity_route = require('./functions/routes/commodity_routes')
const future_route = require('./functions/routes/futures_routes')
const currency_route = require('./functions/routes/currency_routes')
const commodity = require('./functions/commodity')
const future = require('./functions/future')
const currency = require('./functions/currency')
const cron =require("node-cron")

const helmet  =require('helmet')

var SERVER_PORT = 5000;


cron.schedule("50 3 * * *", () => {
    console.log(` commodity function is called now`);
     commodity.call()
    
  });

  cron.schedule("52 3 * * *", () => {
    console.log(`future function is called `);
     future.call()
    
  });

  cron.schedule("54 3 * * *", () => {
    console.log(`Currency function is called `);
     currency.call()
    
  });

  

 
  const app = express()

   
    
  app.use(helmet())

 app.use(commodity_route)
 app.use(future_route)
 app.use(currency_route)

 app.use('/',(req,res)=>{
   res.send("Hello")
 })




 app.listen(SERVER_PORT,function(){
  console.log("Server is listening at port :  ",SERVER_PORT);
});