// get an instance of mongoose and mongoose.Schema
var mongoose     = require('mongoose');
var bcrypt       = require('bcrypt-nodejs');

// set up mongoose model
var userSchema   = mongoose.Schema({

  google         : {
    id           : String,
    token        : String,
    email        : String,
    name         : String,
    hasRole      : Boolean,
    role         : Array,
    languages    : Array 
  }
});

// ---------------------
// Methods
// =====================

// generating hash
userSchema.methods.generateHash  = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and export it
module.exports   = mongoose.model('User', userSchema);