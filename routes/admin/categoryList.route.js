var express = require('express');
var categoryModel = require('../../models/category.model');

var router = express.Router();

router.get('/', (req, res, next) => {

    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 15;
    var offset = (page - 1) * limit;

    Promise.all([
        categoryModel.categoryInfoList(limit, offset),
        categoryModel.countCategoryInfoList(),
        categoryModel.parentCategoryInfoList()
    ]).then(([rows, totalRow, parentRows]) => {

        var total = totalRow[0].total;

        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++) {
            var obj = { value: i, active: i === +page };
            pages.push(obj);
        }

        console.log(rows);

        res.render('dashboardViews/admin/categoryList', {
            layout: 'dashboard.hbs',
            pages,
            PageTitle: 'Danh sách chuyên mục',
            CatInfo: rows,
            ParentCatInfo: parentRows
        });

    }).catch(next);

});

router.post('/edit',(req,res,next)=>{
    var catName = req.body.category_name.replace(/\s\s+/g, ' ').trim();
    console.log(req.body);
    var cat = { category_id: req.body.category_id, category_name: catName, category_parent: req.body.category_parent};
    categoryModel.categoryByParentId(childRows =>{
        if(childRows.length > 0){
            var uf = (c) => {var newc = {category_id:c.category_id, category_parent:req.body.category_parent}; categoryModel.update(newc)};
            Promise.all([uf(cat),childRows.map(c)]).then(()=>{
                res.redirect(req.headers.referer);
            });        
        } else{
            categoryModel.update(cat).then(()=>{
                res.redirect(req.headers.referer);
            })
        }
    });
    // categoryModel.update(cat).then(() => {
    //     res.redirect(req.headers.referer);
    // });
});

module.exports = router;