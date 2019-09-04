
const e = require('express');
const path = require('path');
const router = e.Router();

router.use("/currency",(req,res,next)=>{
   
    res.sendFile(path.join(__dirname,"../","files","currency.json"));

});

module.exports = router;