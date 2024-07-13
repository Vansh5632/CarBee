const router = require('express').Router();
router.post('/signup',(req,res)=>{
    res.json({msg:"testing routes"})
})
module.exports = router