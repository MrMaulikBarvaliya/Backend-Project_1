const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        
    },
    email:{
       type:String,
       required:true,
       unique:true,
    },
    password:String,

});

const users = new mongoose.model("users",userSchema);

module.exports = users;