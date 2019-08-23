const path = require('path')
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const express = require('express')
const commodity_route = require('./routes/commodity_routes')
//const future_route = require('../routes/futures_routes')
const commodity = require('./commodity')
const cron =require("node-cron")





 
  const app = express()

  // commodity-route
   app.use(commodity_route)

   





  // future-route

  //app.use('/futures',future_route)

app.listen(3000)