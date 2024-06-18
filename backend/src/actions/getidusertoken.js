const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

function getiduser(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, authConfig.secret, (err, decode) => {
            if (err) {
                reject("Problema al decodificar el token");
            } else {
                resolve(decode.user.id);
            }
        });
    });
}

module.exports = {
    getiduser
};
