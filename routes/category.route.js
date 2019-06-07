var express = require('express');
var postModel = require('../models/post.model');

var router = express.Router();

router.get('/:id', (req,res,next) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    if(page < 1) page = 1;

    for(const c of res.locals.localCategories){
      if(c.category_id === +id){
        catName = c.category_name;
      }
    }

    var limit = 10;
    var offset = (page - 1)*limit;

    Promise.all(
        [postModel.fullInfoPublishPostByCat(id,limit,offset)]
      ).then(([rows]) => {

        var total = 0;

        rows.forEach(row => {
          ++total;
        });

        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++) {
          var obj = { value: i, active: i === +page };
          pages.push(obj);
        }

        res.render('generalViews/byCategory', {
          pages,
          categoryName: catName,
          PageTitle: 'Chuyên mục ' + catName,
          PostsInfo: rows
        });
        
        console.log(rows);

      }).catch(next);

});

module.exports = router;