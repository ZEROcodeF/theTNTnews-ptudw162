var express = require('express');

var router = express.Router();

router.use('/postlist', require('./postList.route'));

module.exports = router;