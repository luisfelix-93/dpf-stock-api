const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const userService = require('./UserService');
const notificationService = require('../services/NotificationService')
const Session = require('../models/Session');
const {checkPassword} = require('../helper/auth');

class SessionService {
    async createSession(nuRegistration, password) {
        try {
            const findUser = await userService.getUserByCPF(nuRegistration);
            if(!findUser) {
                return res.status(401).json({error: "User / password inválido"});
            };

            
            if(!checkPassword(findUser, password)) {
            return res.status(401).json({error: "User / password inválido!"});
            };
            
            const idUser = findUser.id;
            const nmUser = findUser.nmUser;
            const token = jwt.sign(idUser, authConfig.secret, authConfig.expiresIn);
            const expiresIn = authConfig.expiresIn;
            const dtSession = new Date();


            let email = findUser.email;
            let subject = 'Sessão iniciada';
            let geoIp = await axios.get("http://ip-api.com/json");
            let city = geoIp.data.city;
            let countryCode = geoIp.data.countryCode;

            await notificationService.sessionLoc(email, subject, city, countryCode, dateSession)


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