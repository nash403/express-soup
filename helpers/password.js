const bcrypt = require('bcrypt')

exports.newPassword = function newPassword(length = 10, digitsOnly = false) {
  let newPass = '';
  let digits = '0123456789';
  let characters = digits + (digitsOnly ? '' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@!?=+-_;: $€#*');
  for (let i = 0; i < length; i++) {
    newPass += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return newPass
}

exports.encrypt = function encrypt(password, done) {
  let hashedPassword = null;
  bcrypt.genSalt(10, (err1, salt)=> {
    if (err1) {
      done(err1, false, false); return;
    }
    bcrypt.hash(password, salt, (err2, hash)=> {
      if (err2) {
        done(err2, false, false);
      } else {
        done(null, hash, salt);
      }
    })
  })
}

exports.compare = function compare(givenPassword, userPassword, done) {
  bcrypt.compare(givenPassword, userPassword, (err, ok)=> {
    if (err) {
      done(err); return;
    }
    if (ok) {
      done(null, ok); return;
    }
    done(new Error('Passwords did not match'));
    return;
  })
}

module.exports = exports
