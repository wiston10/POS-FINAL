const { Users} = require("../../db");
const { getiduser } = require("../../actions/getidusertoken");

module.exports = async (req, res) => {
  let token = false;

 
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  try {
    if (!token) {
      throw new Error("error en token");
    }
    const iduser = await getiduser(token);
    if(!iduser){
        throw new Error('NO EXISTE USUARIO')
    }
    const user = await Users.findOne({
      where: {
        id: iduser,   
      }, 
    });

    res.json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
