const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const router = express.Router();

var viewPath = path.join(__dirname, './views');

app.use(express.static(path.join(__dirname, '/public/')));

function routerFunction() {
  router.route('/').get((req, res) => {
    res.render('index', { title: 'Index' });
  });

  return router;
}

app.use('/', routerFunction());

app.set('views', viewPath);

app.set('view engine', 'ejs');

app.server = app.listen(PORT, () => {
  console.log(`api project listening on port: ${PORT}`);
});
