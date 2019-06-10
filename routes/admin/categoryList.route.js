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
        categoryModel.countCategoryInfoList()
    ]).then(([rows, totalRow]) => {

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
            UserRoleTitle: 'Quản trị viên'
        });

    }).catch(next);

});


module.exports = router;