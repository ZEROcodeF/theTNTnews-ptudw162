var express = require('express');

var router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('/editor/postlist');
});

router.use('/postlist', require('./postList.route'));

module.exports = router;