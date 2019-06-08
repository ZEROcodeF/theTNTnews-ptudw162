var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

require('./middlewares/view-engine')(app);

app.use(require('./middlewares/local.middlewares'));

//GET:
app.get('/', require('./routes/home.route'));

app.get('/about', (req, res) => {
  res.render('about', {
    PageTitle: "Trang chủ TNT News"
  });
});

app.get('/testSingle', (req, res) => {
  res.render('testsingle', {
    PageTitle: "Trang chủ TNT News"
  });
});

app.get('/testdashboard', (req, res) => {
  res.render('_layouts/dashboard', {
    layout:false,
    PageTitle: "Trang quản lý &minus; TNT News"
  });
});

app.get('/login', (req, res) => {
  res.render('_nolayout/login', {layout:false});
});

app.get('/register', (req, res) => {
  res.render('_nolayout/register', {layout:false});
});

app.get('/forgotpassword', (req, res) => {
  res.render('_nolayout/forgotpassword', {layout:false});
});

app.use('/category', require('./routes/category.route'));
app.use('/post', require('./routes/post.route'));

app.use((req, res, next) => {
  res.render('_nolayout/404', { layout: false });
})

app.use((error, req, res, next) => {
  res.render('error', {
    layout: false,
    message: error.message,
    error
  })
})

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
})