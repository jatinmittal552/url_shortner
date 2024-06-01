const mongoose = require("mongoose");

const db = new mongoose.Schema({
    shortId:{
        type:String,
        unique:true,
        required:true,
    },
    url:{
        type:String,
        required:true,
    },
    
    visitHistory:[
        {timestamp:{
            type:Number
        }}
    ],
    ipAddress:{
        type:String,
        default:null,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
}, {timestamps:true}
);

const Urls = mongoose.model("Urls",db);

module.exports=Urls;