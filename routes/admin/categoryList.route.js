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

router.post('/edit', (req, res, next) => {
    var catName = req.body.category_name.replace(/\s\s+/g, ' ').trim(); //Replace all uneccessary white spaces
    var catId = req.body.category_id;
    var newParent = req.body.category_parent;
    var callbackURL = req.headers.referer;

    if (catId === req.body.category_parent) { //Anti "parent === this parent" -> this is not allowed
        res.redirect(callbackURL);
    } else {
        var cat = { category_id: catId, category_name: catName, category_parent: newParent};
        categoryModel.categoryByParentId(catId).then(childRows => { //Check for category does have children
            if (childRows.length > 0) {
                var uf = function (c) { //If had, Children should also be "bring" into 'the new parent' of 'old parent' by this function
                    var newc = { category_id: c.category_id, category_parent: newParent};
                    categoryModel.update(newc);
                };
                Promise.all([childRows.map(uf)]).then(([]) => { //Mapping children with above function with Promise to wait all job to be done
                    categoryModel.update(cat).then(() => { //'Cause of "Foreign Key Bindings", all children need to be updated before old parent
                        res.redirect(callbackURL); //All things have done. Redirect to 'CallbackURL' 
                    });
                });
            } else {
                categoryModel.update(cat).then(() => {
                    res.redirect(callbackURL);
                })
            }
        });
    }
});

module.exports = router;