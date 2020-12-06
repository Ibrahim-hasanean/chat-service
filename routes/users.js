var express = require('express');
var router = express.Router();
const User  = require("../models/User");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUsers', async(req, res, next)=>{
  let users = await User.find({}).select(['email','name'])
  res.status(200).send(users);
});
module.exports = router;
