const shortid = require("shortid");
const Urls = require("../model/index");
const user = require("../model/user")    
const {setUser} = require("../webToken/index")

async function getShortId(req,res){
    const header=req.headers;
    const body = req.body;
    if(!body.url) return res.status(400).json("Provide Url")
    const id = shortid()
    const userID = req.user._id;
    await Urls.create({
        shortId:id,
        url:body.url,
        visitHistory:[{timestamp:Date.now()}],
        ipAddress:header.ipaddress,
        createdBy:userID,
    })
    return res.render("client",{id:id,url:body.url});
}

async function redirect(req,res){
    const shortId = req.params.shortId;
    const website = await Urls.findOneAndUpdate({shortId},{$push:{visitHistory:{timestamp:Date.now()}}});    
    if(!website)return res.status(404).json("ID is not matched..");
    return res.redirect(website.url);
}

async function getAnalytics(req,res){
    // const shortId = req.params.shortId;
    const user = req.user;
    const id = user._id;
    console.log(id);
    const website = await Urls.find({createdBy:id});
    if(!website)return res.status(404).json("Id is not matched....");
    return res.render("home",{u:website})
}

async function loginIn(req,res){
    const {email,password} = req.body;

    const emailId = await user.findOne({email});
    if(!emailId) return res.redirect("/signup"); 

    const u = await user.findOne({email,password});
    if(!u)return res.redirect("/login");

    const token = setUser(u);
    res.cookie("uid",token)
    res.redirect("/");

}

async function signUp(req,res){
    const {name,email,password} = req.body;
    try{
        await user.create({
            name,
            email,
            password
        })
        return res.redirect("/login");
    }catch(err){
        alert("Try with different email");
    }
}

module.exports={
    getShortId,
    redirect,
    getAnalytics,
    loginIn,
    signUp
}