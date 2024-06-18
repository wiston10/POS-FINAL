const{Users}=require('../../db');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const authConfig =require('../../config/authConfig');
module.exports=async(req,res)=>{
    const { name, password,gmail } = req.body;
    try{
        let Keyencripted=bcrypt.hashSync(password,Number.parseInt(authConfig.rounds) );
        await Users.create({  name,password:Keyencripted,gmail}).then(user=>{
            let token=jwt.sign({user:user},authConfig.secret,{
                expiresIn:authConfig.expires
            })
            res.status(201).json({user:user,token:token});
        }) ;

    }
    catch(error){   
    res.status(500).json({ error: error.message });
    }
}