const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
var db = require('./database.js');
var crypto = require('crypto');

/* initializing passport local strategy and serializer */

passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.open().then(() => {
        db.get('SELECT * FROM users WHERE username = ?', [username], function (err, row) {
            if (err) { return cb(err); }
            if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

            crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
                if (err) { return cb(err); }
                if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
                return cb(null, row);
            });
        });
    });
}));

passport.serializeUser(function (user, cb) {
    cb(null, user.username);
});

passport.deserializeUser(function (user, cb) {
    db.open().then(() => {
        db.get("select * from users where username = ?", [user], (row, err) => {
            return cb(null, user)
        })
    })

});
