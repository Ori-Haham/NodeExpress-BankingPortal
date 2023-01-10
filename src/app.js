const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

var viewPath = path.join(__dirname, './views');

app.set('views', viewPath);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public/')));

function routerFunction() {
  router.route('/').get((req, res) => {
    res.render('index', { title: 'Index' });
  });

  return router;
}

app.use('/', routerFunction());

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
