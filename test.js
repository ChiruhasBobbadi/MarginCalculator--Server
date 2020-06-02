// console.log("1,550  ".trim().split(',').join(""));
//
// console.log("1,550".includes(','));

var cron = require('node-cron');
const valid = cron.validate('*/5 * 9-16 * 1-5 ');
console.log(valid);