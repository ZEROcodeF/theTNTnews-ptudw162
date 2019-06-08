var express = require('express');
var postModel = require('../models/post.model');

var router = express.Router();

router.get('/:id',(req,res,next)=>{
    
    var postId = req.params.id;

    Promise.all([
        postModel.fullSinglePublishPost(postId),
        postModel.sameCategoryPublishPosts(postId)
    ]).then(([full_post_rows,same_posts_rows])=>{
        console.log(full_post_rows[0]);
        if(full_post_rows[0])
        {
            res.render('generalViews/singlePost',{
                Post: full_post_rows[0],
                SameCategoryPosts: same_posts_rows,
                PageTitle: full_post_rows[0].post_title
            });
        } else {
            res.render('_nolayout/404', { layout: false });
        }
        
    }).catch(next);
});

module.exports = router;