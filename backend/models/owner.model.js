const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true,
    },
    email:String,
    password:String,
    products:{
        type:Array,
        degault:[],
    },
    piture:String,
    gstin:String,
});

module.exports = mongoose.model("Owner",ownerSchema);