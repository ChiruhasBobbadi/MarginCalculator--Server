const e = require('express');
const path = require('path');
const router = e.Router();

router.get("/mmi",(req,res,next)=>{

    res.sendFile(path.join(__dirname,"../","files","mmi","mmi.json"));

});
