var express = require('express');
var morgan = require('morgan');
var auth = require('./middlewares/auth.middlewares');

var app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app); 

app.use(require('./middlewares/local.middlewares'));

//GET General User:
app.use('/', auth.isAuth, require('./routes/home.route'));

//GET Special User:
app.use('/admin',auth.admin,require('./routes/admin/admin.route'));
app.use('/writer',auth.writer,require('./routes/writer/writer.route'));
app.use('/editor',auth.editor,require('./routes/editor/editor.route'));
app.use('/account',require('./routes/account.route'));

app.get('/editpost',(req,res)=>{
  res.render('dashboardViews/editPost',{layout:'dashboard.hbs'});
});

app.get('/testdashboard', (req, res) => {
  res.render('_layouts/dashboard', {
    layout:false,
    PageTitle: "Trang quản lý &minus; TNT News"
  });
});

app.use((req, res, next) => {
  res.render('_nolayout/404', { layout: false });
});

app.use((error, req, res, next) => {
  res.render('error', {
    layout: false,
    message: error.message,
    error
  })
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});