var express = require('express');

var router = express.Router();

router.use('/postlist',require('./postList.route'));

router.use('/accountlist',require('./accountList.route'));

router.use('/categorylist',require('./categoryList.route'));

router.use('/taglist',require('./tagList.route'));

module.exports = router;