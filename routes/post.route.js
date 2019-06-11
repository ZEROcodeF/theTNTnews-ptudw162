var express = require('express');
var postModel = require('../models/post.model');
var tagModel = require('../models/tag.model');
var premiumCheck = require('../middlewares/auth.middlewares').premiumCheck;


var router = express.Router();

router.get('/:id', premiumCheck, (req, res, next) => {

    var postId = req.params.id;

    Promise.all([
        postModel.fullSinglePublishPost(postId),
        postModel.sameCategoryPublishPosts(postId)
    ]).then(([full_post_rows, same_posts_rows]) => {
        if (full_post_rows.length > 0) {
            if (full_post_rows[0].post_type == 'premium') {
                if (req.user) {
                    if (!req.isPremiumUser) {
                        res.render('_noLayout/subscriptionWarning', { layout: false });
                    } else {
                        //Renderpost
                        var activeNavCat = full_post_rows[0].category_parent == 0 ? full_post_rows[0].post_category : full_post_rows[0].category_parent;

                        tagModel.tagListByPostId(postId).then(tags => {
                            if (tags.length == 0) tags = '';
                            res.render('generalViews/singlePost', {
                                activeNavCat,
                                Post: full_post_rows[0],
                                SameCategoryPosts: same_posts_rows,
                                PageTitle: full_post_rows[0].post_title,
                                TagList: tags
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

                tagModel.tagListByPostId(postId).then(tags => {
                    if (tags.length == 0) tags = '';
                    res.render('generalViews/singlePost', {
                        activeNavCat,
                        Post: full_post_rows[0],
                        SameCategoryPosts: same_posts_rows,
                        PageTitle: full_post_rows[0].post_title,
                        TagList: tags
                    });
            
                });
                //RenderpostEND
            }
        }

    }).catch(next);
});

module.exports = router;