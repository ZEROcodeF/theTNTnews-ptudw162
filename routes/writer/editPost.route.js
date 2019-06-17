var express = require('express');
var moment = require('moment');

var postModel = require('../../models/post.model');
var catModel = require('../../models/category.model');
var tagModel = require('../../models/tag.model');
var router = express.Router();


router.get('/:id', (req, res, next) => {

    var postId = req.params.id;

    postModel.singleEditPostById(postId).then(prows => {
        if (prows.length > 0 && prows[0].post_writer === req.user.acc_id && prows[0].post_status != 'publish') {
            tagModel.tagListByPostId(postId).then(trows => {
                res.render('dashboardViews/writer/editPost', {
                    isEdit: true,
                    layout: 'dashboard.hbs',
                    PageTitle: 'Chỉnh sửa: ' + prows[0].post_title,
                    Post: prows[0],
                    Tags: trows,
                    PostButtonTitle: '<i class="far fa-save mr-1"></i>Lưu lại'
                });
            });
        } else {
            res.render('_nolayout/404', { layout: false });
        }

    });

});

router.post('/:id', (req, res, next) => {
    var postId = req.params.id;
    var postType = req.body.post_type;
    var postStatus = 'wait';
    var postCategory = req.body.post_category;
    var postTitle = req.body.post_title;
    var postTime = moment().format('YYYY-MM-DD HH:mm:ss');
    var postThumbnail = req.body.post_thumbnail;
    var postBigThumbnail = req.body.post_bigthumbnail;
    var postSummary = req.body.post_summary;
    var postContent = req.body.post_content;

    var post = {
        post_id: postId,
        post_type: postType,
        post_status: postStatus,
        post_category: postCategory,
        post_title: postTitle,
        post_time: postTime,
        post_thumbnail: postThumbnail,
        post_bigthumbnail: postBigThumbnail,
        post_summary: postSummary,
        post_content: postContent
    }

    var tagsName = req.body.post_tags;

    if (tagsName && (tagsName.length > 0)) {
        Promise.all(tagsName.map((tagname) => {
            return tagModel.addIgnore({ tag_name: tagname });
        })).then(() => {
            Promise.all(tagsName.map((tagname) => {
                return tagModel.findTagByName(tagname).then(tnames => {
                    return tnames[0].tag_id;
                })
            })).then(tagIds => {
                postModel.deleteAttachedTagsByPostId(postId).then(() => {
                    Promise.all([tagIds.map(tagId => {
                        return postModel.attachTag({ posttag_post: postId, posttag_tag: tagId });
                    }),
                    postModel.update(post)]).then(
                        res.redirect('/writer/postlist/all'));
                });
            })
        });
    } else {
        Promise.all([postModel.deleteAttachedTagsByPostId(postId), postModel.update(post)]).then(() => {
            res.redirect('/writer/postlist/all');
        });
    }
});

module.exports = router;