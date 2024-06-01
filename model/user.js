const mongoose = require("mongoose");

const users = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
},{timestamps:true})

const user = mongoose.model("user",users);

module.exports = user;