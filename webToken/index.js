const token = require("jsonwebtoken")
const key = "JatinMittal"

function setUser(user){
    return token.sign({_id:user._id,email:user.email},key)
}
function getUser(id){
    if(!id)return null;
    return token.verify(id,key)
}
module.exports={
    setUser,
    getUser
}