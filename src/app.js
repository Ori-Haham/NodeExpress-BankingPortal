const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

const x = require('./json/accounts.json');

const accountData = fs.readFileSync(
  path.resolve(__dirname, './json/accounts.json'),
  'utf8',
);
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
  path.resolve(__dirname, './json/users.json'),
  'utf8',
);
const users = JSON.parse(userData);

var viewPath = path.join(__dirname, './views');

app.set('views', viewPath);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public/')));

function routerFunction() {
  router.route('/').get((req, res) => {
    res.render('index', { title: 'Account Summary', accounts });
  });

  router.route('/savings').get((req, res) => {
    res.render('account', { account: accounts.savings });
  });

  router.route('/checking').get((req, res) => {
    res.render('account', { account: accounts.checking });
  });

  router.route('/credit ').get((req, res) => {
    res.render('account', { account: accounts.credit });
  });

  router.route('/profile ').get((req, res) => {
    res.render('profile', { user: users[0] });
  });

  return router;
}

app.use('/', routerFunction());

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
