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

const accountData = fs.readFileSync('./json/accounts.json', 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('./json/accounts.json', 'utf8');
const users = JSON.parse(userData);

function routerFunction() {
  router.route('/').get((req, res) => {
    res.render('index', { title: 'Account Summary', accounts });
  });

  return router;
}

app.use('/', routerFunction());

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
