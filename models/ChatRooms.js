const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userId:{
        type:mongoose.Types.Schema,
        required:true
    }  
})
const chatRoomSchema= new Schema({
    users:[usersSchema],
    roomName:{
        type:String,
        required:true
    }
})

const ChatRoom = mongoose.model('chatRoom',chatRoomSchema)

module.exports=ChatRoom;