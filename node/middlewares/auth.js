const jwt = require('jsonwebtoken');
const config = require('../config/config');



const auth = (req, res, next) => {
    const token_header = req.headers.auth;
    if (!token_header) return res.send({error: 'Acesso Proibido'});
    jwt.verify(token_header, config.jwt_password, (err, decoded) =>{
        if (err) return res,send ({error: 'Token Invalido'});
        res.locals.auth_data = decoded;
        return next();
    })
}
module.exports = auth;