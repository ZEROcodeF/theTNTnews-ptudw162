var express = require('express');
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
            catModel.all()]).then(([trows,crows]) =>{
                res.render('dashboardViews/editPost',{
                    layout:'dashboard.hbs',
                    PageTitle:'Chỉnh sửa: ' + prows[0].post_title,
                    Post: prows[0],
                    Tags: trows,
                    Categories: crows,
                    PostButtonTitle: 'Lưu lại'
                });
            }).catch(
            next);
        } else {
            res.render('_nolayout/404', { layout: false });
        }

    });

});



module.exports = router;