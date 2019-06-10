var express = require('express');
var accountModel = require('../models/account.model');

var router = express.Router();

router.get('/is-email-available', (req, res, next) => {
    var userEmail = req.query.email;
    accountModel.singleByEmail(userEmail).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }
        return res.json(true);
    })
});

router.get('/is-pseudonym-available', (req, res, next) => {
    var userPseudonym = req.query.pseudonym;
    accountModel.singleByPseudonym(userPseudonym).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }
        return res.json(true);
    })
});

router.get('/login', (req, res) => {
    res.render('_nolayout/login', { layout: false });
});

router.get('/register', (req, res) => {
    res.render('_nolayout/register', { layout: false });
});

router.get('/forgotpassword', (req, res) => {
    res.render('_nolayout/forgotpassword', { layout: false });
});

module.exports = router;