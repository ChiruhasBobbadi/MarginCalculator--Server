const e = require('express');
const path = require('path');
const router = e.Router();

router.use("/commodity",(req,res,next)=>{

    res.sendFile(path.join(__dirname,"../","files","wisdom_cap","commodity.json"));

});
router.use("/currency",(req,res,next)=>{

    res.sendFile(path.join(__dirname,"../","files","wisdom_cap","currency.json"));

});

router.use("/equity",(req,res,next)=>{

    res.sendFile(path.join(__dirname,"../","files","wisdom_cap","equity.json"));

});

router.use("/futures",(req,res,next)=>{

    res.sendFile(path.join(__dirname,"../","files","wisdom_cap","futures.json"));

});



module.exports = router;