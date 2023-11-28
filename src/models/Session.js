const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    idUser : { type: String, ref: 'User', required: true },
    nmUser : {type: String, ref: 'User', required: true },
    token: { type: String, required: true },
    expiresIn : { type: String, required: true }, 
    dtSession: {type: Date, required: true},
})

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;