const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,    
        required:true,
        unique:true    
    },
    name:{
        type: String,    
        required:true    
    },
    password:{
        type: String,    
        required:true    
    }
})

const User = mongoose.model("users",userSchema);

module.exports= User;