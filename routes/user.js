const express = require("express")
const router = express.Router()
const user = require("../model/user")
const {setUser} = require("../webToken/index")
const {loginIn,signUp} = require("../controller/index")

router.post("/",signUp)

router.post("/login",loginIn);

module.exports = router