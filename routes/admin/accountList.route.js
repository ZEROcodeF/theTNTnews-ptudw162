var express = require('express');
var accountModel = require('../../models/account.model');

var router = express.Router();

router.get('/', (req, res, next) => {

    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 12;
    var offset = (page - 1) * limit;

    Promise.all([
        accountModel.accountInfoList(limit, offset),
        accountModel.countAccountInfoList()
    ]).then(([rows, totalRow]) => {

        var total = totalRow[0].total;

        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++) {
            var obj = { value: i, active: i === +page };
            pages.push(obj);
        }

        res.render('dashboardViews/admin/accountList', {
            layout: 'dashboard.hbs',
            pages,
            PageTitle: 'Danh sách người dùng',
            AccInfo: rows
        });

    }).catch(next);

});

router.get('/:filtertype',(req,res,next)=>{
    var uId = 7 ;
    var filterType = req.params.filtertype; 
    var page = req.query.page || 1 ;
    if (page < 1 ) page = 1;
    var limit = 7;
    var offset = (page - 1) * limit;
    var filterString = ``;

    switch (filterType) {
        case 'all': 
        filterString = `'' OR 1`;
        break;
        case 'subscriber': 
        filterString = `'subscriber'`;
        break;
        case 'writer': 
        filterString = `'writer'`;
        break;
        case 'editor': 
        filterString = `'editor'`;
        break;
    }
    console.log(filterString);
    console.log(filterType);
    if (filterString) {
        Promise.all(
            [accountModel.accountTypeList(filterString,limit,offset),
            accountModel.countAccountTypeList(filterString)]).then(([rows, totalRow]) => {
    
            var total = totalRow[0].total;
            var nPages = Math.floor(total / limit);
            if (total % limit > 0) nPages++;
            var pages = [];
            for (i = 1; i <= nPages; i++) {
                var obj = { value: i, active: i === +page };
                pages.push(obj);
            }
    
            res.render('dashboardViews/admin/accountList', {
                layout: 'dashboard.hbs',
                pages,
                PageTitle: 'Danh sách người dùng',
                AccInfo: rows
            });
    
            console.log(total +'  '+ pages);
    
        }).catch(next);
    } else{
        res.render('_noLayout/404',{layout:false});
    }
})

module.exports = router;