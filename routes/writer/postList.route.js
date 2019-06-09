var express = require('express');
var postModel = require('../../models/post.model');

var router = express.Router();

router.get('/', (req, res, next) => {
    var uId = 7;
    var id = uId;
    var page = req.query.page || 1;

    if (page < 1) page = 1;

    var limit = 10;
    var offset = (page - 1) * limit;

    Promise.all(
        [postModel.writerListPost(id, limit, offset)]
    ).then(([rows]) => {

        var total = 0;

        rows.forEach(row => {
            ++total;
        });

        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++) {
            var obj = { value: i, active: i === +page };
            pages.push(obj);
        }

        res.render('dashboardViews/writer/postList', {
            layout: 'dashboard.hbs',
            pages,
            PageTitle: 'Danh sách bài viết',
            PostsInfo: rows,
            UserRoleTitle: 'Phóng viên'
        });

        console.log(rows);

    }).catch(next);

});

module.exports = router;