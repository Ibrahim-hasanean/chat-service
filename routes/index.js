var express = require('express');
var router = express.Router();
const User = require("../models/User");
const Messages = require("../models/Messages");
const jwt = require("jsonwebtoken");
/* GET home page. */
router.get('/messages',async (req, res, next)=> {
  const {roomId} = req.body;
  let {limit,skip} = req.query;
  limit = limit || 30;
  skip = skip || 0;
   let messages = await Messages.find({
    chatRoomId:roomId
   }).sort({sendTimeDate:-1}).skip(Number(skip)).limit(Number(limit));
   res.status(200).send(messages)
})
/* post home page. */
router.post('/login',async function(req, res, next) {
  const {email,name,password} = req.body;
  if(!email || !name || !password){
    return res.status(400).json({status:400,message:"all fields required"})
  }
  let user = await User.findOne({email})  
  if(!user){
    let newUser= await User.create({email,name,password});  
    let token = jwt.sign({userId:newUser._id},"jsonwebtokensecret",{expiresIn:"500h"});
    return res.status(201).json({status:201,msg:"user created",token,email:newUser.email,userId:newUser._id});
  }
  let token = jwt.sign({userId:user._id},"jsonwebtokensecret",{expiresIn:"500h"})
  return res.status(200).json({status:200,msg:"login success",token,email:user.email,userId:user._id});
});


module.exports = router;