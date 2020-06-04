const express = require('express');
const zerodha = require('./functions/routes/zerodha');
const asthaRoutes = require('./functions/routes/astha');
const commodity = require('./functions/util/zerodha/commodity');
const future = require('./functions/util/zerodha/future');
const currency = require('./functions/util/zerodha/currency');
const astha = require('./functions/util/astha/controller');
const mmi = require('./functions/util/mmi/scrapeMMI');
const path = require('path');

const cron = require("node-cron");

const helmet = require('helmet');

let SERVER_PORT = 5000;


cron.schedule("40 4 * * *", () => {
    console.log(`zerodha commodity function is called now`);
    commodity.call();
    console.log(`astha commodity function is called `);
    astha.commodity();

});


cron.schedule("52 3 * * *", () => {
    console.log(`zerodha future function is called `);
    future.call();
    // console.log(`astha future function is called `);
    // astha.futures();

});

cron.schedule("40 3 * * *", () => {
    console.log(`zerodha Currency function is called `);
    currency.call();
    //asthaCurrency.call();

});

cron.schedule("42 3 * * *", () => {
    console.log(`astha equity function is called `);
    astha.equity();

});

/**
 * every 5 minutes
 * from 9.0 to 16.00 hours
 * from monday to friday
 * IST
 */
cron.schedule("*/5 9-16 * * 1-5",()=>{
    console.log("called at ", new Date());
    mmi.mmi()
},{
    timezone: "Asia/Kolkata"
});

/*
cron.schedule("33 17 * * *", () => {
    console.log(`zerodha commodity function is called now`);
    commodity.call();
    console.log(`astha commodity function is called `);
    astha.commodity();

});

cron.schedule("29 17 * * *", () => {
    console.log(`zerodha future function is called `);
    future.call();
    console.log(`astha future function is called `);
  astha.futures()

});




cron.schedule("30 17 * * *", () => {
   // console.log(`Currency function is called `);
    //currency.call();
    console.log("astha equity is called");
    astha.equity()
});*/

const app = express();


app.use(helmet());

app.use(zerodha);
app.use('/astha', asthaRoutes);
app.use('/mmi', (req, res) => res.sendFile(path.join(__dirname, "functions", "files", "mmi", "mmi.json")));

app.use('/', (req, res) => {
    res.send("Hello friend")
});


app.listen(SERVER_PORT, () => {
    console.log("server started on :" + SERVER_PORT);
});