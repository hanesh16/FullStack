const mongoose = require("mongoose");
const Client=require("./Client")
const ItemSchema=mongoose.Schema({
    name:{
        type:"String"
    },
    description:{
        type:"String"
    },
    status:{
        type:"String",
        enum:["Not Available","Sold Out","Available"]
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Client
    }
})

module.exports=mongoose.model("Item",ItemSchema);
