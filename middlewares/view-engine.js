var express_hbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');

module.exports = function(app){
    app.engine('hbs',express_hbs({
        layoutsDir:'views/_layouts',
        defaultLayout:'general.hbs',
        helpers: {
            section: hbs_sections()
        }
    }));
    app.set('view engine','hbs');
}