var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('/writer/postlist/all');
});

router.use('/postlist',require('./postList.route'));

router.use('/editpost',require('./editPost.route'));

router.use('/newpost',require('./newPost.route'));

module.exports = router;