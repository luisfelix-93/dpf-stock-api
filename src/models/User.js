const mongoose = require('mongoose');

/*
'user': {
'idUser' : ' type: Object ',
'nmUser' : ' type : String ',
'email' : ' type : String ',
'nuRegistration' : ' type : String '
'password' : ' type : String '
}
*/

const userSchema = new mongoose.Schema({
    nmUser : {type: String, rquired: true},
    email : {type: String, rquired: true},
    nuRegistration : {type: String, rquired: true},
    password : {type: String, rquired: true}

});

const User = mongoose.model('User', userSchema);

module.exports = User;
