var express = require('express');
var postModel = require('../models/post.model');
var tagModel = require('../models/tag.model');
var premiumCheck = require('../middlewares/auth.middlewares').premiumCheck;

var router = express.Router();


router.get('/:id', premiumCheck, (req, res, next) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    var postName = '';
    var activeNavCat = 0;
    console.log(id);
    if (page < 1) page = 1;

    var limit = 7;
    var offset = (page - 1) * limit;

    var searchFunc = postModel.searchFullInfoPublishPost(id, limit, offset);

    if (req.user && req.isPremiumUser) {
        searchFunc = postModel.searchFullInfoPublishPremiumPriorPost(id, limit, offset);
    }

    Promise.all(
        [searchFunc,
            postModel.countSearchFullInfoPublishPost(id)
        ]
    ).then(([rows, totalRow]) => {

        var total = totalRow[0].total;

        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++) {
            var obj = {
                value: i,
                active: i === +page
            };
            pages.push(obj);
        }

        Promise.all(rows.map((row) => {
            return tagModel.tagListByPostId(row.post_id).then(tags => {
                var arr = [row, tags];
                return arr
            })
        })).then(arrs => {
            res.render('generalViews/byCategory', {
                activeNavCat,
                pages,
                PageTitle: 'Danh sách tìm kiếm',
                PostMetaData: arrs
            });
        });
    }).catch(next);


});

module.exports = router;