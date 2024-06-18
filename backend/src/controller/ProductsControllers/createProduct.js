 
const { Products,Images } = require('../../db');
const AWS = require('aws-sdk');
//data amws
const acces_aws= process.env.AWS_ACCESS_KEY;
const region_aws = process.env.AWS_REGION;
const secret_aws = process.env.AWS_SECRET_KEY;
const { getiduser} =require('../../actions/getidusertoken')
module.exports = async (req, res) => {
  const { description, name ,price,category,store} = req.body;
  const files = req.files; 
  let token = false;
  if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
  }
  
  try {
    
    const iduser =await getiduser(token);

    if(!token){
      throw new Error('error en token');
    }
    if(files.length>6){
      throw new Error("maximo 6 imagenes por producto");
    }
    if (!files || files.length === 0) {
      throw new Error('no tiene imagenes del producto');
    }
    if(!description||!name||!price||!category||!store){
      throw new Error('faltan datos para crear un producto');
    }
   


    const productSQL=await Products.create({
      description,name,price,category,store,state:"active",userId:iduser
    });
    const s3 = new AWS.S3({
      signatureVersion: 'v4',
      accessKeyId: acces_aws,
      secretAccessKey: secret_aws,
      region: region_aws,   
    });
    // array url images
    const uploadPromises = files.map(async (files) => {
      const params = {
        Bucket: 'awsimages-medicamentos',
        Key: `${Date.now()}_${files.originalname}`,
        Body: files.buffer,
        ContentType: files.mimetype,
        ACL: 'public-read',
      };

      const result = await s3.upload(params).promise();
       await Images.create({
        url:result.Location,
        productId:productSQL.id
      })
      return { url: result.Location };
    });
   // Esperar a que todas las promesas se resuelvan antes de enviar la respuesta
   const images = await Promise.all(uploadPromises);

 //RESPONSE ALL IMAGES AND DATA PRODUCTS
    res.json({ product: productSQL,
      images:images
     }); // `Location` contiene la URL del objeto en S3.
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
