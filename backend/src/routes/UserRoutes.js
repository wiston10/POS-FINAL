const { register,login,datauser} =require('../controller/userController/index');
const midalware = require("../midelwares/auth");
const userRoutes=require('express').Router();
userRoutes
    .post('/register',register)
   .post('/login',login)
   .get('/data',midalware,datauser)

 module.exports=userRoutes;   