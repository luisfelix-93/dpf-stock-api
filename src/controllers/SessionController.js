const jwt = require('jsonwebtoken');
const sessionService = require('../services/SessionService')

class SessionController {
    async create(req, res) {
        const { cpf, password } = req.body;
        
        try{
            const session = await sessionService.createSession(cpf, password);
            res.status(200).json(session);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SessionController();
