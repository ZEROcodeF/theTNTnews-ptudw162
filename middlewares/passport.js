var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var accountModel = require('../models/account.model');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    var ls = new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        accountModel.singleInfoByEmail(username).then(rows => {
            if (rows.length === 0) {
                return done(null, false, {
                    message: 'Invalid username.'
                });
            }

            var user = rows[0];
            
            console.log(rows[0].acc_hpw);
            console.log(rows[0].acc_id);
            var ret = bcrypt.compare(password, toString(rows[0].acc_hpw));
            if (ret) {
                return done(null, user);
            }

            return done(null, false, {
                message: 'Invalid password.'
            });
        }).catch(err => {
            return done(err, false);
        })
    });

    passport.use(ls);

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}