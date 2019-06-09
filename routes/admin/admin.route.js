var express = require('express');

var router = express.Router();

router.use('/postlist',require('./postList.route'));

router.use('/accountlist',require('./accountList.route'));

module.exports = router;