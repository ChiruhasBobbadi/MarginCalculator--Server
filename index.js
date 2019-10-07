
const express = require('express');
const commodity_route = require('./functions/routes/commodity_routes');
const future_route = require('./functions/routes/futures_routes');
const currency_route = require('./functions/routes/currency_routes');
const commodity = require('./functions/commodity');
const future = require('./functions/future');
const currency = require('./functions/currency');
const cron =require("node-cron");

const helmet  =require('helmet');

let SERVER_PORT = 5000;


cron.schedule("40 4 * * *", () => {
    console.log(` commodity function is called now`);
     commodity.call()

  });


  cron.schedule("52 3 * * *", () => {
    console.log(`future function is called `);
     future.call()

  });

  cron.schedule("40 3 * * *", () => {
    console.log(`Currency function is called `);
    currency.call()

});



  // cron.schedule("43 11 * * *", () => {
  //   console.log(` commodity function is called now`);
  //    commodity.call()
  //
  // });

  // cron.schedule("47 1 * * *", () => {
  //   console.log(`future function is called `);
  //    future.call()
  //
  // });

  //
  // cron.schedule("15 14 * * *", () => {
  //   console.log(`Currency function is called `);
  //    currency.call()
  //
  // });

 
  const app = express();

   
    
  app.use(helmet());

 app.use(commodity_route);
 app.use(future_route);
 app.use(currency_route);

 app.use('/',(req,res)=>{
   res.send("Hello")
 });



 app.listen(SERVER_PORT,function () {
     console.log("server started on :" + SERVER_PORT);
 });