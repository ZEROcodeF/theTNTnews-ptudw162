var express = require('express');

var router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('/admin/postlist/all');
});

router.use('/postlist',require('./postList.route'));

router.use('/accountlist',require('./accountList.route'));

router.use('/categorylist',require('./categoryList.route'));

router.use('/taglist',require('./tagList.route'));

router.use('/editpost',require('./editPost.route'));

router.use('/newpost',require('./newPost.route'));

router.use('/accountdetails',require('./accountDetails.route'));

module.exports = router;