const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:String,
    price:String,
    category:String,
    userId:String,
    company:String

});

const users = new mongoose.model("produts",productSchema);

module.exports = users;