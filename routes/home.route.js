var express = require('express');
var postModel = require('../models/post.model');

var router = express.Router();

router.get('/', (req, res, next) => {
    Promise.all([
        postModel.featuredPosts(),
        postModel.latestPosts(),
        postModel.mostViewPost(),
        postModel.postOfTopCategory()]).
        then(([frows, lrows, mrows, prows]) => {

            var groupedLRows = [];
            var i = 0;
            var temp = [];
            lrows.forEach(element => {
                temp.push(element);
                if (i == 1) {
                    groupedLRows.push(temp);
                    i = 0;
                    temp = [];
                } else
                    i++;
            });

            res.render('home', {
                PageTitle: 'Trang chủ TNTNews',
                FeaturedPosts: frows,
                LatestPosts: groupedLRows,
                MostViewPosts: mrows,
                PostsOfTopCategory: prows
            });
        }).catch(next);
});

router.use('/category', require('./category.route'));

router.use('/tag', require('./tag.route'));

router.use('/post', require('./post.route'));

router.use('/search',require('./search.route'));

router.use('/about', (req, res) => {
    res.render('about', {
        PageTitle: "Trang chủ TNT News"
    });
});

module.exports = router;