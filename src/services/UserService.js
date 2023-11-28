const User = require('../models/User');

class UserService {
    async registerUser(nmUser, email, nuRegistration, password) {
       try{   
            const user = {
                nmUser,
                email, 
                nuRegistration, 
                password
            };
        const newUser = new User(user);
        return newUser;
        } catch(error) {
            throw error;
        }
    }

    async getUserById(userId) {
        try {
          return await User.findById(userId);
        } catch (error) {
          throw error;
        }
    }
    
    async getUserByEmail(email) {
        try {
          return await User.findOne({ email });
        } catch (error) {
          throw error;
        }
    }
    
    async getUserByCPF(nuRegistration) {
        try {
          return await User.findOne({ nuRegistration });
        } catch (error) {
          throw error;
        }
    }
}

module.exports = new UserService();