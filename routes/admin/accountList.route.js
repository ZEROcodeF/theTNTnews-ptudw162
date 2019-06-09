var express = require('express');
//var accountModel = require('../../models/account.model');

var router = express.Router();

router.get('/',(req,res,next)=>{
   res.render('dashboardViews/admin/accountList',{
       layout:'dashboard.hbs'
   });
});

module.exports = router;