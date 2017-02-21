function newPassword(length = 10) {
  let newPass = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!?=+-_;: $€#*';
  for (let i = 0; i < length; i++) {
    newPass += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return newPass
}

module.exports = newPassword
