const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;
const Bank = require('../models/bank');

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
Bank.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new CustomStrategy(
  function(req, done) {
  Bank.findOne({username : req.body.username}).then(function(user){
    if (!user) { return done(null, false); }
    if (user.password != req.body.password) {return done(null, false); }
    return done(null, user);
  });
  }
));
