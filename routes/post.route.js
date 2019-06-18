var express = require('express');
var postModel = require('../models/post.model');
var catModel = require('../models/category.model');
var tagModel = require('../models/tag.model');
var commentModel = require('../models/comment.model');
var auth = require('../middlewares/auth.middlewares');
var moment = require('moment');


var router = express.Router();

router.get('/:id', auth.premiumCheck, (req, res, next) => { ///Mdw 'premiumCheck' for checking is user 'premium'

    var postId = req.params.id;

    Promise.all([
        postModel.fullSinglePublishPost(postId),
        postModel.sameCategoryPublishPosts(postId)
    ]).then(([full_post_rows, same_posts_rows]) => {
        if (full_post_rows.length > 0) {
            if (full_post_rows[0].post_type == 'premium') {
                if (req.user) {
                    if (!req.isPremiumUser) { //is User premium
                        res.render('_noLayout/subscriptionWarning', { layout: false });
                    } else {
                        //Renderpost
                        var activeNavCat = full_post_rows[0].category_parent == 0 ? full_post_rows[0].post_category : full_post_rows[0].category_parent;
                        Promise.all([tagModel.tagListByPostId(postId),
                        commentModel.allCommentsByPostId(postId),
                        postModel.increaseViewByPostId(postId)])
                            .then(([tags, comments,result]) => {
                                if (tags.length == 0) tags = [];
                                if (commentModel.length == 0) comments = [];
                                res.render('generalViews/singlePost', {
                                    activeNavCat,
                                    Post: full_post_rows[0],
                                    SameCategoryPosts: same_posts_rows,
                                    PageTitle: full_post_rows[0].post_title,
                                    TagList: tags,
                                    CommentList: comments,
                                    CommentCount: comments.length
                                });

                            });
                        //RenderpostEND
                    }
                } else {
                    res.redirect('/account/login');
                }
            } else {
                //Renderpost
                var activeNavCat = full_post_rows[0].category_parent == 0 ? full_post_rows[0].post_category : full_post_rows[0].category_parent;
                Promise.all([tagModel.tagListByPostId(postId),
                commentModel.allCommentsByPostId(postId),
                postModel.increaseViewByPostId(postId)])
                    .then(([tags, comments]) => {
                        if (tags.length == 0) tags = [];
                        if (commentModel.length == 0) comments = [];
                        var CommentCount = comments.length;
                        res.render('generalViews/singlePost', {
                            activeNavCat,
                            Post: full_post_rows[0],
                            SameCategoryPosts: same_posts_rows,
                            PageTitle: full_post_rows[0].post_title,
                            TagList: tags,
                            CommentList: comments,
                            CommentCount
                        });

                    });
                //RenderpostEND
            }
        } else {
            res.render('_nolayout/404', { layout: false });
        }
    }).catch(next);
});

router.post('/:id/comment', (req, res, next) => {
    if (req.user) {
        var cmt = {
            cmt_post: req.params.id,
            cmt_account: req.user.acc_id,
            cmt_content: req.body.cmt_content,
            cmt_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        commentModel.add(cmt).then(() => {
            res.redirect(req.headers.referer);
        }).catch(error => console.error(error)
        );
    } else {
        res.redirect(req.headers.referer);
    }
});

module.exports = router;