const nodemailer = require('nodemailer');
require('dotenv').config();

class NotificationService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASSWORD
            }
        });
    }

    async sessionLoc(email, subject, city, countryCode, dateSession) {
        try {
            // Configurar o email
            let mailOptions = {
                from: process.env.EMAIL_LOCAL,
                to: email,
                subject: subject,
                text: `You started a session on ${city}, ${countryCode}, at ${dateSession}`,
            };
            await this.transporter.sendMail(mailOptions);
    
        } catch (error) {
            console.error('Error on sending a email: ', error.message);
            throw error;
        }
    }

    async emailNotify(email, subject, notify) {
        try {
            let mailOptions = {
                from: process.env.EMAIL_NOTIFY,
                to: email,
                subject: subject,
                text: notify
            };
            await this.transporter.sendMail(mailOptions);
            
        }   catch (error) {
            console.error('Error on sending a email: ', error.message);
            throw error;
        }

    }
}

module.exports = new NotificationService();