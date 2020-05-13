const express = require('express');
const zerodha = require('./functions/routes/zerodha');
const asthaRoutes = require('./functions/routes/astha');
const commodity = require('./functions/util/zerodha/commodity');
const future = require('./functions/util/zerodha/future');
const currency = require('./functions/util/zerodha/currency');
const astha = require('./functions/util/astha/controller');


const cron = require("node-cron");
// const logger = require('morgan');
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


// cron.schedule("33 17 * * *", () => {
//     console.log(`zerodha commodity function is called now`);
//     commodity.call();
//     console.log(`astha commodity function is called `);
//     astha.commodity();
//
// });

/*cron.schedule("29 17 * * *", () => {
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

// app.use(logger('dev'));
app.use(helmet());

app.use(zerodha);
app.use('/astha', asthaRoutes);

app.use('/', (req, res) => {
    res.send("Hello friend")
});


app.listen(SERVER_PORT, function () {
    console.log("server started on :" + SERVER_PORT);
});