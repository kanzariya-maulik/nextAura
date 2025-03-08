const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image:{
        filename:String,
        url:String,
    },
    name:{
        type:String,
    },
    price:{
        type:Number,
    },
    discount:{
        type:Number,
        default:0,
    },
    bgcolor:{
        type:String
    },
    panelcolor:{
        type:String,

    },
    textcolor:{
        type:String
    }
});

module.exports = mongoose.model("Product",productSchema);