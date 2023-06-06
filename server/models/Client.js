const mongoose = require("mongoose");

const ClientSchema=mongoose.Schema({
    name:{
        type:"String"
    },
    uname:{
        type:"String"
    },
    email:{
        type:"String"
    },
     phone:{
        type:"String"
    }
})

module.exports=mongoose.model("Client",ClientSchema);
