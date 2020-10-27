const router = require('express').Router() ; 
const User = require('../models/User');
const {registerValidation,loginvalidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {jwtOptions} = require('../config/jwtOptions');



exports.user_signup= async (req,res)=>{
    //Data Validation 
     const {error} =  registerValidation  (req.body);
   
     if (error) return res.status(400).send(error.details[0].message)

    //checking if email exist 
    const emailExist = await User.findOne({
        email : req.body.email 
    })

    if (emailExist) return res.status(400).send('Email exist  ') ; 


    //Hash passwords
    const salt = await bcrypt.genSalt(10);  
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User ({
       fullName : req.body.fullName ,
       address : req.body.address ,
       phone : req.body.phone ,
       email : req.body.email , 
       password : hashPassword ,
       role : req.body.role
        });
        try {
            const savedUser = await user.save()
            res.send({
                user: savedUser._id 
            }); 
        }catch (err){
            res.status(400).send(err); 
        }
    }


exports.user_login = async (req,res)=>{
   // console.log('login here ') ; 
    const {error} = loginvalidation(res.body) ; 

    if (error) return res.status(400).send(error.details[0].message) ; 

    const user = await User.findOne({
        email : req.body.email  
    }) 
    if (!user) return res.status(400).send("invalid Email"); 
    
    
    //PASSWORD IS CORRECT 
    bcrypt.compare( req.body.password , user.password, (err, result) =>{
        if(err){
             res.status(403).json('Incorrect Password');
        }
        if(result){
            let payload = { user };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);

           return res.status(200).json({ message: 'ok', token , email: user.email  });
        }
        else{
          return  res.status(403).json('incorrect password');
        }

    })

}


exports.user_current =   function(req, res) {
  //  console.log('current user here ')  ; 
        return res.status(200).json(req.userData);
 
}