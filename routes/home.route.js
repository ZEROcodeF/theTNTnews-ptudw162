var express = require('express');
var postModel = require('../models/post.model');

var router = express.Router();

router.get('/',(req,res,next)=>{
    Promise.all([
        postModel.featuredPosts(),
        postModel.latestPosts(),
        postModel.mostViewPost(),
        postModel.postOfTopCategory()]).
        then(([frows,lrows,mrows,prows]) =>{
            console.log(frows);
            // console.log(lrows);
            // console.log(mrows);
            // console.log(prows);
            
            var groupedLRows = [];
            var i = 0;
            var temp=[];
            lrows.forEach(element => {
               temp.push(element);
               if(i == 1){
                    groupedLRows.push(temp);
                    i = 0;
                    temp=[];
               } else 
                    i++;
            });
            
            console.log(groupedLRows);

            res.render('home',{
                PageTitle: 'Trang chủ TNTNews',
                FeaturedPosts: frows,
                LatestPosts: groupedLRows,
                MostViewPosts: mrows,
                PostsOfTopCategory: prows
            });
        }).catch(next);
});

module.exports = router;