var express = require('express');
var accountModel = require('../models/account.model');
var passport = require('passport');
var bcrypt = require('bcrypt');
var moment = require('moment');
var notAuth = require('../middlewares/auth.middlewares').notAuthRequired;

var router = express.Router();

router.get('/is-email-available', notAuth, (req, res, next) => {
    var userEmail = req.query.email;
    accountModel.singleByEmail(userEmail).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }
        return res.json(true);
    })
});

router.get('/is-pseudonym-available', notAuth, (req, res, next) => {
    var userPseudonym = req.query.pseudonym;
    accountModel.singleByPseudonym(userPseudonym).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }
        return res.json(true);
    })
});

router.get('/login', notAuth, (req, res) => {
    res.render('_nolayout/login', {
        referer: req.headers.referer,
        layout: false
    });
});


router.get('/register', notAuth, (req, res) => {

    res.render('_nolayout/register', {
        layout: false
    });

});

router.get('/forgotpassword', notAuth, (req, res) => {
    res.render('_nolayout/forgotpassword', {
        layout: false
    });
});


router.post('/login', notAuth, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            //console.log('error');
            return next(err);
        }

        if (!user) {
            //console.log('false');
            return res.render('_noLayout/login', {
                layout: false,
                err_message: info.message
            })
        }

        req.logIn(user, err => {
            if (err) {
                return next(err);
            }
            var strURL = '/';
            if (req.user.acc_permission) {
                switch (req.user.acc_permission) {
                    case 'admin':
                        strURL = '/admin/postlist';
                        break;
                    case 'writer':
                        strURL = '/writer/postlist/all';
                        break;
                    case 'editor':
                        strURL = '/editor/postlist';
                        break;
                    default:
                        if (req.body.refURL) strURL = req.body.refURL;
                        break;
                }
            }
            return res.redirect(strURL);
        });

    })(req, res, next);
})


router.post('/register',notAuth, (req, res, next) => {
    var saltRounds = 10;
    var hash = bcrypt.hash(req.body.password, saltRounds);
    var dob = moment(req.body.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var strPermission = '0';
    var strPseudonym = '';
    if (req.body.iswriter) {
        strPermission = 'writer';
        strPseudonym = req.body.pseudonym;
    }
    else {
        strPermission = 'subscriber';
    }

    var entity = {
        acc_email: req.body.email,
        acc_hpw: hash,
        acc_fullname: req.body.fullname,
        acc_birthdate: dob,
        acc_pseudonym: strPseudonym,
        acc_permission: strPermission
    }

    accountModel.add(entity).then(id => {
        res.redirect('/account/login');
    })
})

router.post('/logout', (req, res, next) => {
    if (req.user) {
        req.logOut();
        res.redirect('/account/login');
    } else {
        next();
    }
})


module.exports = router;