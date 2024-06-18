 
const {  Bills } = require('../../db');
 
 
const { getiduser} =require('../../actions/getidusertoken')
module.exports = async (req, res) => {
  const {clientname} = req.body;
  let token = false;
  if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
  }
  
  try {
    
    const iduser =await getiduser(token);

    if(!token){
      throw new Error('error en token');
    }

    if(!clientname){
      throw new Error('faltan nombre del cliente');
    }

    const billSql=await Bills.create({
      clientname,state:"open",userId:iduser
    });



    res.json({ data: billSql,
    
     }); // `Location` contiene la URL del objeto en S3.
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
