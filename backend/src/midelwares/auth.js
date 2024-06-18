const jwt = require('jsonwebtoken');
const { Users } = require('../db');
const authConfig = require('../config/authConfig');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ msg: "Acceso no autorizado" });
    } else {
        let token = req.headers.authorization.split(" ")[1];
        // Comprobar validez de token
        jwt.verify(token, authConfig.secret, async (err, decode) => {
            if (err) {
                res.status(500).json({ msg: "Problema al decodificar el token" });
            } else {
              
                try {
                    const userid = await Users.findOne({
                        where: {
                            id: decode.user.id
                        }
                    });
                    if(userid){
                        next();
                    }
                   else{
                    throw new Error('USUARIO NO ENCONTRADO')
                   }
                } catch (err) {
                    res.status(500).json({ msg: "Error al buscar el usuario en la base de datos" });
                }
            }
        });
    }
}
