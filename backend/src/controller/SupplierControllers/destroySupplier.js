const { Suppliers  } = require("../../db");

const { getiduser } = require("../../actions/getidusertoken");
module.exports = async (req, res) => {
    const { id } = req.params;
    let token = false;
  
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    try {
      const iduser = await getiduser(token);
  
      if (!token) {
        throw new Error("Error en token");
      }
  
      await Suppliers.destroy({
        where: {
          id: id,
          userIdSuplier: iduser
        }
      });
  
      res.json({ data: "Proveedor borrado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };