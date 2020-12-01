
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.User;

async function login(req,res){
    const data = req.body

    try {
    const user = await User.findOne({where: {email:data.email}});
    console.log(user.id)

    if(!user) {
        return res.json({status:false, message: "Sorry this email does not exist"});
    }

   const validPassword = bcrypt.compareSync(data.password, user.password); 
   console.log(validPassword)
   if(!validPassword) return res.json({status:false, message: "Invalid Login Details"});

   let payload = { id: user.id };
    let token = jwt.sign(payload, 'OneLoNGSecreT1234567890');

   return res.json({status:true, message: "login successfull", token: token});

    } catch (error) {
      return  res.json("An error occured"+error) 
    }
    
}
  
    
async function register(req,res){
    const newUser = req.body
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;
    try {
        const createduser = await User.create(newUser);
        if(!createduser) return res.json({status:false, message: "Could  not create user"});
        return res.json({status:true, message: "User created successfull"});
    } catch (error) {
        res.json("An error occured"+error) 
    }
}
  
async function profile(req,res){
    const user = req.user;
    console.log(user);
    try {
        const createduser = await User.findOne({id:user.id});
        if(!createduser) return res.json({status:false, message: "Could  not finduser"});
        return res.json({status:true, message: "User find successfull", user:createduser});
    } catch (error) {
        res.json("An error occured"+error) 
    }
}

  module.exports = { 
      register, 
      login,
      profile
  }