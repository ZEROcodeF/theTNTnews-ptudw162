var express = require('express');
var moment = require('moment');

var postModel = require('../../models/post.model');
var catModel = require('../../models/category.model');
var tagModel = require('../../models/tag.model');

var router = express.Router();


router.get('/', (req, res, next) => {
    catModel.all().then(crows => {
        res.render('dashboardViews/writer/editPost', {
            isEdit: false,
            layout: 'dashboard.hbs',
            PageTitle: 'Tạo bài viết mới',
            Categories: crows,
            PostButtonTitle: '<i class="far fa-save mr-1"></i>Lưu lại'
        })
    });
});


router.post('/', (req, res, next) => {
    var postType = req.body.post_type;
    var postStatus = 'wait';
    var postCategory = req.body.post_category;
    var postTitle = req.body.post_title;
    var postTime = moment().format('YYYY-MM-DD HH:mm:ss');
    var postWriter = req.user.acc_id;
    var postThumbnail = req.body.post_thumbnail;
    var postBigThumbnail = req.body.post_bigthumbnail;
    var postSummary = req.body.post_summary;
    var postContent = req.body.post_content;

    var post = {
        post_type: postType,
        post_status: postStatus,
        post_category: postCategory,
        post_title: postTitle,
        post_time: postTime,
        post_writer: postWriter,
        post_thumbnail: postThumbnail,
        post_bigthumbnail: postBigThumbnail,
        post_summary: postSummary,
        post_content: postContent
    }

    var tagsName = req.body.post_tags;

    if (tagsName && (tagsName.length > 0)) { //If have tags
        Promise.all(tagsName.map((tagname) => {
            return tagModel.addIgnore({ tag_name: tagname });
        })).then(() => {
            Promise.all(tagsName.map((tagname) => {
                return tagModel.findTagByName(tagname).then(tnames => {
                    return tnames[0].tag_id;
                })
            })).then(tagIds => {
                postModel.add(post).then((insertedId) => {
                    Promise.all(tagIds.map(tagId=>{
                        return postModel.attachTag({posttag_post:insertedId,posttag_tag:tagId});
                    })).then(()=>{res.redirect('/writer/postlist/all')});
                });
            })
        });
    } else {
        postModel.add(post).then((insertedId) => {
            res.redirect('/writer/postlist/all');
        })
    }
});


module.exports = router;