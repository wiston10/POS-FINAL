const { Users } = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/authConfig');

module.exports = async (req, res) => {
    const { password, gmail } = req.body;
    let token = false;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (token&&!password,!gmail) {
        // Comprobar validez de token
        try {
            jwt.verify(token, authConfig.secret, async (err, decode) => {
                if (err) {
                    if (!password || !gmail) {
                      
                    } else {
                        const user = await Users.findOne({
                            where: { gmail: gmail }
                        });
                        if (!user) {
                            throw new Error("No existe estee usuario");
                        }

                        if (user&&bcrypt.compareSync(password, user.password)) {
                            // Devolvemos token
                            const token = jwt.sign({ user: user }, authConfig.secret, {
                                expiresIn: authConfig.expires
                            });
                            return res.json({
                                user,
                                token: token
                            });
                        } else {
                            throw new Error("Contraseña no coincide");
                        }
                    }
                } else {
                    const userdata=await Users.findOne({
                        where:{
                            id:parseInt(decode.user.id) 
                        }
                    })
                    if(!userdata){
                       return res.status(400).json({msg:"error token"})
                    }
                    return res.json({
                        user: userdata,
                        token: token
                    });
                }
            });
        } catch (error) {
            return res.status(400).json({ error: 'error al iniciar' });
        }
    }
    else{
        try {
            // Buscar usuario por correo electrónico
            const userGmail = await Users.findOne({ where: { gmail } });
            
            if (!userGmail) {
                // Si no se encuentra el usuario, devolver un mensaje de error con el código de estado 404
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            // Comparar la contraseña proporcionada con la contraseña almacenada usando bcrypt.compare
            bcrypt.compare(password, userGmail.password, (err, result) => {
                if (err) {
                    // Manejar el error de comparación de contraseñas
                    console.error('Error al comparar contraseñas:', err);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }
    
                if (result) {
                    // Si las contraseñas coinciden, generar un token
                    const token = jwt.sign({ user: userGmail }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    // Enviar respuesta con el usuario y el token
                    return res.status(200).json({ user: userGmail, token });
                } else {
                    // Si las contraseñas no coinciden, devolver un mensaje de error con el código de estado 400
                    return res.status(400).json({ error: 'Contraseña incorrecta' });
                }
            });
        } catch (error) {
            // Manejar cualquier otro error que ocurra
            console.error('Error al buscar usuario:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

    }
}