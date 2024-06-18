const { Suppliers, Phones } = require("../../db");

const { getiduser } = require("../../actions/getidusertoken");
module.exports = async (req, res) => {
  const { description, name, direction,  city, phone } = req.body;
  let token = false;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    console.log(phone)
    const iduser = await getiduser(token);
    if (!token) {
      throw new Error("error en token");
    }
    if (!name || !direction || !city  || !phone) {
      throw new Error("faltan datos para crear un provedor");
    }
    
    const newSupplier = await Suppliers.create({
      description,
      name,
      direction,
      city,
      userIdsuplier: iduser,
    });
    for (let i = 0; i < phone.length; i++) {
      await Phones.create({
        number: phone[i],
        suppliersId: newSupplier.id,
      });
    }

    res.json({ suplier: newSupplier });  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
