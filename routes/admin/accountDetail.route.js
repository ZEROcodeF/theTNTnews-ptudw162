var express = require('express');
var accountModel = require('../../models/account.model');

var router = express.Router();

router.get('/:id', (req, res, next) => {
    var accID = req.params.id;
    if (accID) {
        Promise.all(
            [accountModel.accountByAccID(accID)]).then(([rows])=>{
            res.render('dashboardViews/admin/UserDetail', {
                layout: 'dashboard.hbs',
                PageTitle: 'Người dùng',
                AccInfo: rows
            });
        }).catch(next);
        } 
        else{
            res.render('_noLayout/404',{layout:false});
        }

    })
module.exports = router;