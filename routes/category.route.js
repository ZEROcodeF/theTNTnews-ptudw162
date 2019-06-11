var express = require('express');
var postModel = require('../models/post.model');
var tagModel = require('../models/tag.model');
var premiumCheck = require('../middlewares/auth.middlewares').premiumCheck;

var router = express.Router();

router.get('/:id', premiumCheck, (req, res, next) => {
  var id = req.params.id;
  var page = req.query.page || 1;
  var catName = '';
  var activeNavCat = 0;

  if (page < 1) page = 1;

  for (const c of res.locals.localCategories) {
    if (c.category_id === +id) {
      catName = c.category_name;
      if (c.category_parent == 0) {
        activeNavCat = c.category_id;
      } else {
        activeNavCat = c.category_parent;
      }
    }
  }

  if (catName != '') {
    var limit = 7;
    var offset = (page - 1) * limit;

    var catFunc = postModel.fullInfoPublishPostByCat(id, limit, offset);

    if(req.user && req.isPremiumUser){
      catFunc = postModel.fullInfoPublishPremiumPriorPostByCat(id, limit, offset);
    }

    Promise.all(
      [catFunc,
      postModel.countFullInfoPublishPostByCat(id)]
    ).then(([rows, totalRow]) => {

      var total = totalRow[0].total;

      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
      }

      Promise.all(rows.map((row) => {
        return tagModel.tagListByPostId(row.post_id).then(tags => {
          var arr = [row, tags]; return arr
        })
      })).then(arrs => {
        if (arrs.length == 0) arrs = '';
        res.render('generalViews/byCategory', {
          activeNavCat,
          pages,
          categoryName: catName,
          PageTitle: 'Chuyên mục ' + catName,
          PostMetaData: arrs
        });
        // console.log(arrs);
      });
    }).catch(next);
  }
  else {
    res.render('_noLayout/404', { layout: false });
  }

});

module.exports = router;