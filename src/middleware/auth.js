const authConfig = require('../config/auth')
const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({ error: 'Token not provided' });
    }

    //Bearer XXX
    const [, token] = authHeader.split(' ');
    const decoded = await jwt.verify(token, authConfig.secret);
    req.userId = decoded.id;
    
    await next();
}

module.exports = authMiddleware;