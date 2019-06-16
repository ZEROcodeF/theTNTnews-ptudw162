var express = require('express');
var tagModel = require('../../models/tag.model');

var router = express.Router();

router.get('/', (req, res, next) => {

    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 15;
    var offset = (page - 1) * limit;

    Promise.all([
        tagModel.tagInfoList(limit, offset),
        tagModel.countTagInfoList()
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

        res.render('dashboardViews/admin/tagList', {
            layout: 'dashboard.hbs',
            pages,
            PageTitle: 'Danh sách nhãn',
            CatInfo: rows
        });

    }).catch(next);

});

router.post('/edit', (req, res, next) => {
    var tagName = req.body.tag_name.replace(/\s\s+/g, ' ').trim();
    var tag = { tag_id: req.body.tag_id, tag_name: tagName };
    tagModel.update(tag).then(() => {
        res.redirect(req.headers.referer);
    });
});

router.post('/add', (req, res, next) => {
    var tagName = req.body.tag_name.replace(/\s\s+/g, ' ').trim();
    var newtag = {tag_name:tagName};
    tagModel.addIgnore(newtag).then(()=>{
        res.redirect(req.headers.referer);
    });
});

router.post('/delete', (req, res, next) => {
    tagModel.deleteAttachedTagById(req.body.tag_id).then(()=>{
        tagModel.delete(req.body.tag_id).then(()=>{
            res.redirect(req.headers.referer);
        });
    });
    console.log(req.body);
});

module.exports = router;