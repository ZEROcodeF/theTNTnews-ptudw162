var express_hbs = require('express-handlebars');
var moment = require('moment');
var hbs_sections = require('express-handlebars-sections');

module.exports = function(app){
    app.engine('hbs',express_hbs({
        layoutsDir:'views/_layouts',
        defaultLayout:'general.hbs',
        helpers: {
            formatDate: dateVal=>{
               return moment(dateVal).format('DD/MM/YYYY');
            },
            isPremiumPost: postType =>{
                if (postType == 'premium') return '<a class="post-category post_premium" style="margin-left:5px;"><i class="fa fa-star" aria-hidden="true" title="Bài viết Premium"></i></a>';
                return;
            }
        }
    }));
    app.set('view engine','hbs');
}