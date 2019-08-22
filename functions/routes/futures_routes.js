
const e = require('express')
const path = require('path')
const router = e.Router()

router.use("/futures",(req,res,next)=>{
   console.log(__dirname)
    res.sendFile(path.join(__dirname,"../","files","futures.json"));

})

module.exports = router