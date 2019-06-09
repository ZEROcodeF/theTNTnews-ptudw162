var categoryModel = require('../models/category.model');

module.exports = (req, res, next) => {
  categoryModel.all().then(rows => {
    var groupedCates = [];
    var cates =[];
    rows.forEach(r => {
      if(r.category_parent == 0 && r.category_id !=0){
        var cate = [];
        cate.push(r);
        cates.push(r);
        rows.forEach(element => {
          if(element.category_parent == r.category_id){
              cate.push(element);
              cates.push(element);
          }
        });
        groupedCates.push(cate);
      }
    });
    res.locals.localGroupedCategories = groupedCates;
    res.locals.localCategories = cates;
    // console.log(res.locals.localCategories);
    // console.log(res.locals.localGroupedCategories);
    next();
  })
}
