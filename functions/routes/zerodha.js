const e = require('express');
const path = require('path');
const router = e.Router();

router.use("/commodity",(req,res,next)=>{

    res.sendFile(path.join(__dirname,"../","files","zerodha","commodity.json"));

});

router.use("/currency",(req,res,next)=>{

    res.sendFile(path.join(__dirname,"../","files","zerodha","currency.json"));

});

router.use("/futures",(req,res,next)=>{

    res.sendFile(path.join(__dirname,"../","files","zerodha","futures.json"));

});

module.exports = router;