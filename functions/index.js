
const express = require('express')
const commodity_route = require('./routes/commodity_routes')
const future_route = require('./routes/futures_routes')
const commodity = require('./commodity')
const future = require('./future')
const cron =require("node-cron")
const functions = require('firebase-functions');
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

   
    
//   app.use(helmet())

//  app.use(commodity_route)
//  app.use(future_route)
       

 app.use('/',(req,res)=>{
   res.send("Hello")
 })


 exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});

 port = process.env.PORT||9000;
console.log(port)
 app.listen(port)