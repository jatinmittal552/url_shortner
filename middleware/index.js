const {getUser} = require("../webToken/index")

async function authenticate(req,res,next){
    const id = req.cookies?.uid
    if(!id){
        console.log("if")
        return res.redirect("/login")
    }
    const user = getUser(id);
    if(!user){
        return res.redirect("/login");
    }
    req.user=user;
    next();
}

async function checkAuth(req,res,next){
    const id = req.cookies?.uid
    const user = getUser(id);
    req.user=user;
    next();
}

module.exports={
    authenticate,
    checkAuth
}