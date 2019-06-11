var moment = require('moment');
var accountModel = require('../models/account.model');

module.exports.admin = (req, res, next) => {
    console.log('---Admin required for ');
    next();
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

module.exports.vipSubcriber = (req, res, next) => {
    if (req.user) {
        var uid = req.user.acc_id;
        accountModel.accountSubscription(uid).then(rows => {
            if (rows.length > 0) {
                if (moment().isBefore(moment(rows[0].sub_time).add('7', 'days'))) {
                    next();
                }
            } else {
                res.render('_nolayout/subscriptionWarning', { layout: false, backUrl: '/' });
            }
        })
    } else res.redirect('/account/login');
}

module.exports.isAuth = (req, res, next) => {
    if (!req.user) {
        res.redirect('/account/login');
    } else next();
}