const passport = require("passport");
const LocalStrategy = require("passport-local");
const authenService = require("./authenticateService");

passport.use(
  new LocalStrategy({ usernameField: "username" }, async function verify(
    username,
    password,
    cb
  ) {
    const user = await authenService.checkUserCredentials(username, password);
    if (user) return cb(null, user);
    return cb(null, false);
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, name: user.name, email: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;
