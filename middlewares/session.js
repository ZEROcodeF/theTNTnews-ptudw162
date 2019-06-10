var session = require('express-session');

module.exports = function (app) {
    app.use(session({
        secret: 'nhattoitri',
        resave: true,
        saveUninitialized: true
    }));
}