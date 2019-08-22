
const express = require('express')
const commodity_route = require('./functions/routes/commodity_routes')
const future_route = require('./functions/routes/futures_routes')
const commodity = require('./functions/commodity')
const future = require('./functions/future')
const cron =require("node-cron")

const helmet  =require('helmet')



cron.schedule("04 00 * * *", () => {
    console.log(` commodity function is called now`);
     commodity.call()
    
  });

  cron.schedule("05 00 * * *", () => {
    console.log(`future function is called `);
     future.call()
    
  });
  

 
  const app = express()

   
    
  app.use(helmet())

 app.use(commodity_route)
 app.use(future_route)
       

 app.use('/',(req,res)=>{
   res.send("Hello")
 })



 port = process.env.PORT||9000;

app.listen(port)