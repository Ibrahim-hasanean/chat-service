const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chat-service",{useUnifiedTopology:true,useNewUrlParser:true}).then(()=>{
    console.log("mongoose connected")
}).catch(e=>{
    console.log(e)
})