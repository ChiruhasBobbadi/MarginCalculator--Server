
const e = require('express')
const path = require('path')
const router = e.Router()

router.use("/commodity",(req,res,next)=>{
   //console.log(__dirname)
    res.sendFile(path.join(__dirname,"../","public","files","commodity.json"));

})

module.exports = router