var moment = require('moment');
var accountModel = require('../models/account.model');
var postModel = require('../models/post.model');

module.exports.admin = (req, res, next) => {
    if (req.user) {
        if (req.user.acc_permission == 'admin') {
            next();
        } else {

        }
    }
}

module.exports.editor = (req, res, next) => {
    console.log('---EDITOR required for ');
    //console.log(res);
    next();
}

module.exports.writer = (req, res, next) => {
    console.log('---WRITER required for ');
    //console.log(res);
    next();
}

module.exports.premiumCheck = (req, res, next) => {
    if (req.user) {
        accountModel.accountSubscription(req.user.acc_id).then(subs => {
            if (subs.length > 0) {
                req.isPremiumUser = true;
                next();
            } else {
                if (req.user.acc_permission == 'admin') {
                    req.isPremiumUser = true;
                    next();
                }
                else next();
            }
        })
    } else { next() }
}

module.exports.isAuth = (req, res, next) => {
    if (req.user) {
        res.locals.isAuthenticated = true;
        res.locals.accountName = req.user.acc_fullname;
    } else { res.locals.isAuthenticated = false; }
    next();
}

module.exports.notAuthRequired = (req, res, next) => {
    if (req.user) {
        redirect('/');
    } else next();
}