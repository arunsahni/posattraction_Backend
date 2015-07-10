var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required!'},
    lastName: {type:String, required:'{PATH} is required!'},
    username: {type:String,
               required:'{PATH} is required!',
               unique: true},
    salt: {type:String, required:'{PATH} is required!'},
    password: {type:String, required:'{PATH} is required!'},
    birthDate: {type: Date}
});

userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashedPwd(this.salt, passwordToMatch) === this.password;
    }
};

var User = mongoose.model('User',userSchema);
