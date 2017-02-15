/*
 * Here, put the global config for your app.
 * Unlike the .env file that depends on your environment, in this file you should
 * put configs that is common wherever the app is installed.
 *
 * NOTE: Try to limit dependencies to other modules in this file as it may be
 * required anywhere in the app.
 */
module.exports = {
  mailer: {
    auth: {
      user: 'test@example.com',
      pass: 'secret',
    },
    defaultFromAddress: 'First Last <test@examle.com>'
  }
}
