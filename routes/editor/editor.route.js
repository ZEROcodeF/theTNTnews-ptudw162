var express = require('express');
var postModel  = require('../../models/post.model');

var router = express.Router();

router.use('/postlist',require('./postList.route'));

module.exports = router;