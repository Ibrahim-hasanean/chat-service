const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messagesSchema = new Schema({
    senderId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    chatRoomId:{
        type:String,
        required:true
    },
    message:{
        type: String,
        required:true
    }
},{timestamps:true})

const Messages = mongoose.model("messages",messagesSchema);

module.exports=Messages;