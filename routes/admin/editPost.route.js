var express = require('express');
var moment = require('moment');

var postModel = require('../../models/post.model');
var catModel = require('../../models/category.model');
var tagModel = require('../../models/tag.model');
var router = express.Router();


router.get('/:id', (req, res, next) => {
    var postId = req.params.id;

    postModel.singleEditPostById(postId).then(prows => {
        if (prows.length > 0) {
            Promise.all([
                tagModel.tagListByPostId(postId),
                catModel.all()]).then(([trows, crows]) => {
                    res.render('dashboardViews/editPost', {
                        layout: 'dashboard.hbs',
                        PageTitle: 'Chỉnh sửa: ' + prows[0].post_title,
                        Post: prows[0],
                        Tags: trows,
                        Categories: crows,
                        PostButtonTitle: '<i class="far fa-save mr-1"></i>Lưu lại'
                    });
                }).catch(
                    next);
        } else {
            res.render('_nolayout/404', { layout: false });
        }

    });

});

router.post('/:id', (req, res, next) => {
    var postId = req.params.id;
    var postType = req.body.post_type;
    if (req.body.post_status) {
        var postStatus = req.body.post_status;
    } else {
        postStatus = 'publish';
    }
    var postCategory = req.body.post_category;
    var postTitle = req.body.post_title;
    var postTime = moment(req.body.post_time).format('YYYY-MM-DD HH:mm:ss');
    var postThumbnail = req.body.post_thumbnail;
    var postBigThumbnail = req.body.post_bigthumbnail;
    var postSummary = req.body.post_summary;
    var postContent = req.body.post_content;
    var postDenyReason = 'Bị từ chối bởi Admin';

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
        post_content: postContent,
        post_denyreason: postDenyReason
    }

    var tagsName = req.body.post_tags;

    if (tagsName.length > 0) {
        Promise.all(tagsName.map((tagname) => {
            return tagModel.addIgnore(tagname);
        })).then(() => {
            Promise.all(tagsName.map((tagname) => {
                return tagModel.findTagByName(tagname).then(tnames => {
                    return tnames[0].tag_id;
                })
            })).then(tagIds => {
                postModel.deleteAttachedTagsByPostId(postId).then(() => {
                    Promise.all(tagIds.map(tagId => {
                        return postModel.attachTag({ posttag_post: postId, posttag_tag: tagId });
                    })).then(res.redirect(req.headers.referer));
                });
            })
        });
    } else {
        postModel.deleteAttachedTagsByPostId(postId).then(() => {
            res.redirect(req.headers.referer)
        });
    }
});

module.exports = router;