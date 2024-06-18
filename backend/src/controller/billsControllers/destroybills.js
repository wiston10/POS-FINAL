const { Bills } = require('../../db');
const { getiduser } = require('../../actions/getidusertoken');

module.exports = async (req, res) => {
  const { id } = req.params;
  let token = false;
  
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  
  try {
    const iduser = await getiduser(token);

    if (!token) {
      throw new Error('Error en token');
    }

    let billssearch = await Bills.findOne({
      where: {
        id: id,
        userId: iduser
      }
    });

    if (!billssearch) {
      throw new Error('Factura no encontrada para el usuario actual');
    }

    billssearch.state = "cancel";
    await billssearch.save();

    res.json({ data: "Cuenta cancelada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
