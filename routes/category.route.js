var express = require('express');
var postModel = require('../models/post.model');

var router = express.Router();

router.get('/:id', (req,res,next) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    var catName = '';
    var activeNavCat = 0;

    if(page < 1) page = 1;

    for(const c of res.locals.localCategories){
      if(c.category_id === +id){
        catName = c.category_name;
        if(c.category_parent == 0){
          activeNavCat = c.category_id;
        } else {
          activeNavCat = c.category_parent;
        }  
      }
    }

    if(catName != ''){
      var limit = 7;
      var offset = (page - 1)*limit;

      Promise.all(
          [postModel.fullInfoPublishPostByCat(id,limit,offset),
          postModel.countFullInfoPublishPostByCat(id)]
        ).then(([rows,totalRow]) => {

          var total = totalRow[0].total;
          
          rows.forEach(row => {
            
          });

          var nPages = Math.floor(total / limit);
          if (total % limit > 0) nPages++;
          var pages = [];
          for (i = 1; i <= nPages; i++) {
            var obj = { value: i, active: i === +page };
            pages.push(obj);
          }

          res.render('generalViews/byCategory', {
            activeNavCat,
            pages,
            categoryName: catName,
            PageTitle: 'Chuyên mục ' + catName,
            PostsInfo: rows
          });

      }).catch(next);
    }
    else{
        res.render('_noLayout/404',{layout:false});
    }

});

module.exports = router;