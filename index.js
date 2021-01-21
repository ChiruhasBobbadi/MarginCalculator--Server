const express = require('express');
const zerodha = require('./functions/routes/zerodha');
const asthaRoutes = require('./functions/routes/astha');
const aliceRoute = require('./functions/routes/alice');
const commodity = require('./functions/util/zerodha/commodity');
const future = require('./functions/util/zerodha/future');
const currency = require('./functions/util/zerodha/currency');
const astha = require('./functions/util/astha/controller');
const mmi = require('./functions/util/mmi/scrapeMMI');
const samco = require('./functions/util/samco/controller');
const wisdom = require('./functions/util/wisdom_cap/controller');
const path = require('path');
const alice = require('./functions/util/alice/controller');
const samcoRoute = require('./functions/routes/samco');
const wisdomRoute = require('./functions/routes/wisdom_cap');
const cron = require("node-cron");

const helmet = require('helmet');

let SERVER_PORT = 5000;

//commodity
cron.schedule("10 10 * * *", () => {
    console.log(`zerodha commodity function is called now`);
    commodity.call();
    console.log(`astha commodity function is called `);
    astha.commodity();
    //console.log(`ALICE commodity function is called `);
    //alice.commodity();
}, {
    timezone: "Asia/Kolkata"
});

// futures
cron.schedule("52 8 * * *", () => {
    future.call();
    astha.futures();
    //alice.futures();
    samco.futures();
}, {
    timezone: "Asia/Kolkata"
});

//currency
cron.schedule("10 9 * * *", () => {
    currency.call();
    astha.currency();
   // alice.currency();
    samco.currency();
}, {
    timezone: "Asia/Kolkata"
});

// equity
cron.schedule("12 9 * * *", () => {
    astha.equity();
    //alice.equity();
    samco.equity();
    wisdom.equity();
}, {
    timezone: "Asia/Kolkata"
});

/**
 * every 5 minutes
 * from 9.0 to 16.00 hours
 * from monday to friday
 * IST
 */
cron.schedule("*/5 9-16 * * 1-5",()=>{
    // console.log("called at ", new Date());
    mmi.mmi()
},{
    timezone: "Asia/Kolkata"
});


const app = express();


app.use(helmet());

app.use(zerodha);
app.use('/astha', asthaRoutes);
app.use('/alice',aliceRoute);
app.use('/samco', samcoRoute);
app.use('/wisdom', wisdomRoute);
app.use('/mmi', (req, res) => res.sendFile(path.join(__dirname, "functions", "files", "mmi", "mmi.json")));
app.use('/', (req, res) => {
    res.send("Hello friend")
});


app.listen(SERVER_PORT, () => {
    console.log("server started on :" + SERVER_PORT);
});
