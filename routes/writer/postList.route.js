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
            helpers: {
                headerOfType:(post_status, editorName) => {
                    switch (post_status) {
                        case 'publish':
                            return '<h6 class="m-0 text-success"><i class="fa fa-check-circle mr-1"></i>Đã được duyệt bởi '+editorName+'</h6>';
                        case "deny":
                            return '<h6 class="m-0 text-danger"><i class="fa fa-times-circle mr-1"></i>Bị từ chối từ '+editorName+'</h6>';
                        case "wait":
                            return '<h6 class="m-0 text-warning"><i class="fa fa-clock mr-1"></i>Đang chờ duyệt</h6>';
                        default:
                            break;
                    }
                },
                footerOfType: (post_status, postDate, postDenyReason) => {
                    switch (post_status) {
                        case "publish":
                            return '<p class="m-0 text-success"><i class="fas fa-info-circle mr-2"></i>Đăng vào ngày '+postDate+'</p>';
                        case "deny":
                            return '<p class="m-0 text-danger"><i class="fas fa-info-circle mr-2"></i>Lý do: '+postDenyReason+'</p>';
                        default:
                            break;
                    }
                }
            }
        });

        console.log(rows);

    }).catch(next);

});

module.exports = router;