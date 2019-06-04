var categoryModel = require('../models/category.model');

module.exports = (req, res, next) => {
  categoryModel.all().then(rows => {
    var cates = [];
    rows.forEach(r => {
      if(r.category_parent == 0){
        var cate = [];
        cate.push(r);
        rows.forEach(element => {
          if(element.category_parent == r.category_id){
              cate.push(element);
          }
        });
        cates.push(cate);
      }
    });
    res.locals.localCategories = cates;
    console.log(res.locals.localCategories);
    next();
  })
}
