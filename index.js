const express = require("express");
const connectToMongo = require("./connection");
const app = express()
const port = 8001;
const path = require("path");
const cookieParser = require("cookie-parser");

const urlSchema = require("./routes/index")
const dataSchema = require("./routes/staticRoutes")
const userSchema = require("./routes/user")
const {authenticate,checkAuth} = require("./middleware/index")


connectToMongo("mongodb://127.0.0.1:27017/url-shortner").then(()=>{
    console.log("Mongo connected")
})
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())
app.use("/",checkAuth,dataSchema)
app.use("/url",authenticate,urlSchema)
app.use("/user",userSchema)
app.listen(port,()=>{console.log("Server started")})