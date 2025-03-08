const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:String,
    cart:{
        type:Array,
        default:[],
    },
    isAdmin:Boolean,
    orders:{
        type:Array,
        default:[],
    },
    contact:{
        type:String,
    },
    piture:{
        filename:String,
        url:String,
    },
});

module.exports = mongoose.model("User",userSchema);