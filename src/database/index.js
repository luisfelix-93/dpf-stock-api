const mongoose = require('mongoose');

class Database {
    constructor() {
        const mongoUri = 'mongodb://localhost:27017/';

        mongoose.connect(mongoUri);
        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'Error connecting to MongoDB: '));
        db.once('open', () => {
            console.log('Connected to MongoDB database');
          });
    }
}

module.exports = new Database();