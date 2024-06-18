// llama a las variables de entorno para desencriptar//
module.exports={
    secret:process.env.AUTH_SECRET,
    expires:process.env.AUTH_EXPIRES,
    rounds:process.env.AUTH_ROUNDS
}