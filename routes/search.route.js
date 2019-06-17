var express = require('express');
var postModel = require('../models/post.model');
var tagModel = require('../models/tag.model');
var premiumCheck = require('../middlewares/auth.middlewares').premiumCheck;

var router = express.Router();


router.get('', premiumCheck, (req, res, next) => {

    var strQuery = req.query.q;

    var isTitle = req.query.title == "true" ? true : false;
    var isSummary = req.query.summary == "true" ? true : false;
    var isContent = req.query.content == "true" ? true : false;

    if (!isTitle && !isContent && !isSummary) res.redirect(`/search?q=${strQuery}&title=true&summary=true&content=true`);
    else {
        var page = req.query.page || 1;
        var activeNavCat = 0;
        if (page < 1) page = 1;

        var limit = 7;
        var offset = (page - 1) * limit;

        var strFilters = '';
        if (isTitle) strFilters += 'post_title,';
        if (isSummary) strFilters += 'post_summary,';
        if (isContent) strFilters += 'post_content,';


        if (strFilters[strFilters.length - 1] == ',') strFilters = strFilters.slice(0, strFilters.length - 1);

        var searchFunc = postModel.searchFullInfoPublishPost(strFilters, strQuery, limit, offset);

        if (req.user && req.isPremiumUser) {
            searchFunc = postModel.searchFullInfoPublishPremiumPriorPost(strFilters, strQuery, limit, offset);
        }

        Promise.all(
            [searchFunc,
                postModel.countSearchFullInfoPublishPost(strFilters, strQuery)
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
                    isSearch: true,
                    pages,
                    PageTitle: 'Kết quả tìm kiếm cho \"' + strQuery + '\"',
                    PostMetaData: arrs
                });
            });
        }).catch(next);
    }

});

module.exports = router;