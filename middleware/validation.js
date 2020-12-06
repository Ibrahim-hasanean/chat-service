const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports= (req,res,next) =>{ 
    try {  
        const {token} = req.headers;
        let decode=  jwt.verify(token,"jsonwebtokensecret");
        let user = User.findById(decode.userID)
        req.body.user= user;
        next()
    } catch (e) {
        return res.status(401).json({status:401,message:"user not authurize"})
    }
}
