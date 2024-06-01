const express = require("express")
const { getAnalytics } = require("../controller");

const router = express.Router();
const Urls = require("../model")
router
.get("/",async (req,res)=>{
    // const urls= await Urls.find({})
    // return res.render("home",{u:urls})
    return res.render("client")
})
.get("/login",(req,res)=>{
    return res.render("login",{
        error:"Invalid Credential"
    })
})
.get("/signup",(req,res)=>{
    return res.render("signup")
})
module.exports = router
