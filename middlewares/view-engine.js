var express_hbs = require('express-handlebars');
var moment = require('moment');
var hbs_sections = require('express-handlebars-sections');

module.exports = function (app) {
    app.engine('hbs', express_hbs({
        layoutsDir: 'views/_layouts',
        defaultLayout: 'general.hbs',
        helpers: {
            formatDate: dateVal => {
                return moment(dateVal).format('DD/MM/YYYY');
            },
            formatTime: timeVal => {
                return moment(timeVal).format('HH:mm:ss DD/MM/YYYY');
            },
            isPremiumPost: postType => {
                if (postType === 'premium') return '<a class="post-category post_premium" style="margin-left:5px;"><i class="fa fa-star" aria-hidden="true" title="Bài viết Premium"></i></a>';
                return;
            },
            ifEquals: (val1, val2, options) => {
                console.log(val1);
                console.log(val2);
                console.log(val1===val2);
                if (val1 === val2) {
                    return options.fn(this);;
                }
                else {
                    return options.inverse(this);
                }
            },
            isPublished: (status, time) => {
                return (status === 'publish') && (moment().isAfter(moment(time)));
            },
            section: hbs_sections()
        }
    }));
    app.set('view engine', 'hbs');
}