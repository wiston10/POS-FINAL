const { Bills } = require("../../db");
const { getiduser } = require("../../actions/getidusertoken");

module.exports = async (req, res) => {
  let token = false;
  const pageNumber = parseInt(req.query.pageNumber) || 1; // Página por defecto es 1
  const pageSize = parseInt(req.query.pageSize) || 6; // NUMERO DE ELEMENTOS

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  try {
    if (!token) {
      throw new Error("error en token");
    }
    const iduser = await getiduser(token);
    const totalBills = await Bills.count({
      where: {
        userId: iduser,
        state: "open",
      }
    });
    const totalpages = Math.ceil(totalBills / pageSize);

    const billSql = await Bills.findAll({
      where: {
        userId: iduser,
      },
      
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
    });

    
    res.json({
      data: billSql,
      totalPages: totalpages,
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
