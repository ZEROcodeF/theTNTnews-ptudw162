var express = require('express');
var postModel = require('../models/post.model');

var router = express.Router();

router.get('/editPost',(req,res,next) => {
	res.render('dashboardViews/editPost');
})

module.exports = router;