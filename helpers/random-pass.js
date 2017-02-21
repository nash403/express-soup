function newPassword(length = 10, digitsOnly = false) {
  let newPass = '';
  let digits = '0123456789';
  let characters = digits + (digitsOnly ? '' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@!?=+-_;: $€#*');
  for (let i = 0; i < length; i++) {
    newPass += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return newPass
}

module.exports = newPassword
