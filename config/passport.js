function configure() {
  const passport = require('passport')
      , LocalStrategy = require('passport-local').Strategy
      , BearerStrategy = require('passport-http-bearer').Strategy
      , {BasicStrategy, DigestStrategy} = require('passport-http')


  // Initialize passport session

  passport.serializeUser((user, done) => {
    let sessionUser = { _id: user.id }
    done(null, sessionUser)
  })

  passport.deserializeUser((sessionUser, done) => {
    // The sessionUser object is different from the user mongoose collection
    // it's actually req.session.passport.user and comes from the session collection
    done(null, sessionUser)
  })


  // Configure strategies

  /**
   * Sign in using Email and Password. ('local')
   */
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    (req, email, password, done) => {
      /**
       * Authenticate with email and password. Req is passed here if you need more
       * informations to authenticate the user.
       *
       * - If an error occur call done(err)
       * - If authentification fails call done(null, false)
       * - If authentification succeeds call done(null, user)
       */
      done(null, false)
  }))

  /**
   * Sign in using Bearer strategy. ('bearer')
   *
   * The Bearer strategy requires a `verify` function which receives the
   * credentials (`token`) contained in the request.  The function must invoke
   * `cb` with a user object, which will be set at `req.user` in route handlers
   * after authentication.
   */
  passport.use(new BearerStrategy(
    (token, done) => {
      /**
       * Authenticate with a token provided in header or in body or query
       * (via a property namaed `access_token`).
       * You can create/verify token using `jsonwebtoken` package for example.
       *
       * - If an error occur call done(err)
       * - If authentification fails call done(null, false)
       * - If authentification succeeds call done(null, user)
       */
      done(null, false)
  }))

  /**
   * Sign in using Basic strategy. ('basic')
   *
   * The Basic strategy requires a `verify` function which receives the
   * credentials (`username` and `password`) contained in the request.  The
   * function must verify that the password is correct and then invoke `cb` with
   * a user object, which will be set at `req.user` in route handlers after
   * authentication.
   */
  passport.use(new BasicStrategy(
    (username, password, done) => {
      /**
       * Authenticate with username and password.
       *
       * - If an error occur call done(err)
       * - If authentification fails call done(null, false)
       * - If authentification succeeds call done(null, user)
       */
      done(null, false)
  }))

  /**
   * Sign in using Digest strategy. ('digest')
   *
   * The Digest strategy requires a `secret`function, which is used to look up
   * user. The function must invoke `cb` with the user object as well as the
   * user's password as known by the server. The password is used to compute a
   * hash, and authentication will fail if the computed value does not match that
   * of the request. The user object will be set at `req.user` in route handlers
   * after authentication.
   */
  passport.use(new DigestStrategy({ qop: 'auth' },
    (username, done) => {
      /**
       * Authenticate with username.
       *
       * - If an error occur call done(err)
       * - If authentification fails call done(null, false)
       * - If authentification succeeds call done(null, user, `user's password`)
       */
      done(null, false)
  }))


  // Add as much strategies as you want, or remove some of the above...
}

module.exports = configure
module.exports.configure = configure
