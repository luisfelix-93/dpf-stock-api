const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const userService = require('./UserService');
const Session = require('../models/Session');

class SessionService {
    async createSession(nuRegistration, password) {
        try {
            const findUser = await userService.getUserByCPF(nuRegistration);
            if(!findUser) {
                return res.status(401).json({error: "User / password inválido"});
            };
            const idUser = findUser.id;
            const nmUser = findUser.nmUser;
            const token = jwt.sign(idUser, authConfig.secret, authConfig.expiresIn);
            const expiresIn = authConfig.expiresIn;
            const dtSession = new Date();

            const session = {
                idUser,
                nmUser,
                token,
                expiresIn,
                dtSession
            };

            const newSession = new Session(session);
            return newSession;
        } catch(error) {
            return error;
        }
    }
}
module.exports = new SessionService();