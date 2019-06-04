var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

require('./middlewares/view-engine')(app);

app.get('/',(req,res)=>{
    res.render('home',{
      PageTitle: "Trang chủ TNT News"
    });
});


app.use((req, res, next) => {
    res.render('404', { layout: false });
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