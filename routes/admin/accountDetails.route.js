var express = require('express');
var moment = require('moment');

var accountModel = require('../../models/account.model');
var categoryModel = require('../../models/category.model');
var postModel = require('../../models/post.model');

var router = express.Router();

router.get('/:id', (req, res, next) => {
    var uid = req.params.id;
    accountModel.singleInfoById(uid).then(urows => {
        if (urows.length > 0) {
            var user = urows[0];
            accountModel.accountSubscription(user.acc_id).then(subs => {
                var Subscription = null;
                if (subs.length > 0) {
                    Subscription = subs[0];
                }
                if (user.acc_permission == 'editor') {
                    categoryModel.getCateInChargeMapWithEditor(user.acc_id).then(icrows => {
                        console.log(icrows);
                        res.render('dashboardViews/admin/accountDetails', {
                            layout: 'dashboard.hbs',
                            PageTitle: 'Chi tiết người dùng: ' + user.acc_fullname,
                            AccInfo: user,
                            Subscription,
                            InChargedCateMap: icrows
                        })
                    });
                } else {
                    res.render('dashboardViews/admin/accountDetails', {
                        layout: 'dashboard.hbs',
                        PageTitle: 'Chi tiết người dùng: ' + user.acc_fullname,
                        AccInfo: user,
                        Subscription
                    })
                }
            })
        } else {
            res.render('_noLayout/404', { layout: false });
        }
    });
});

router.post('/update', (req, res, next) => {
    var userId = req.body.acc_id;

    var accPseudonym = '';
    var cateCharged = null;

    if (req.body.acc_permission == 'editor') cateCharged = req.body.in_charged_cates;

    if (req.body.acc_permission == 'writer') cateCharged = req.body.acc_pseudonym;

    var user = {
        acc_id: userId,
        acc_permission: req.body.acc_permission,
        acc_pseudonym: accPseudonym
    };

    categoryModel.deleteCateInChargeWithEditor(userId).then(() => {
        accountModel.update(user).then(() => {
            if (cateCharged) {
                console.log(cateCharged);
                Promise.all(cateCharged.map(catec => {
                    return categoryModel.addCateInChargeWithEditor({ categoryeditor_category: catec, categoryeditor_editor: userId });
                })).then(() => { res.redirect('/admin/accountlist') });
            } else {
                res.redirect('/admin/accountlist');
            }
        })
    });
});

router.post('/delete/:id', (req, res, next) => {
    var uid = req.params.id;

    Promise.all([
        accountModel.delelteCategoryEditorById(uid),
        accountModel.delelteCommentById(uid),
        accountModel.deleteSubscriptionById(uid),
        accountModel.updateEditorToNonPerson(uid),
        accountModel.updateWriterToNonPerson(uid)
    ]).then(() => {
        accountModel.delete(uid).then(() => {
            res.redirect('/admin/accountlist');
        });
    });
});

router.post('/extendviptime/:id', (req, res, next) => {
    console.log('Gia han: ' + req.params.id);
    accountModel.addSubscription(req.params.id, moment().format('YYYY-MM-DD HH:mm:ss')).then(() => {
        res.redirect('/admin/accountlist')
    });
});

module.exports = router;