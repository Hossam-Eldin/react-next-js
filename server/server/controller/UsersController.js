const Users = require('../models').Users;
const uid = require('uid');
const bcrypt = require('bcrypt');
const passport = require('passport')
const JWT = require('jsonwebtoken');
const Keys = require('../config/keys');



signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    id: user.id,
    type:user.type,
    name: user.username,
    avatar: user.avatar,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, Keys.JwtKey);
}


exports.googleOAuth = async (req, res, next) => {
  // Generate token
  console.log('req.user', req.user)
  const token = signToken(req.user);

  res.status(200).json({token});
}

exports.facebookOAuth = async (req,res,next) => {
  //Generate token

  console.log('req.user', req.user);

  const token = signToken(req.user);
  res.status(200).json({token});
}


//**get user by uid */

exports.getUser = (req,res,next)=>{
  let uid = req.params.uid;
  Users.findOne({where:{uid:uid}})
  .then(response=>{
    res.send({data:response});
  })

}