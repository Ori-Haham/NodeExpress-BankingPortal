const fs = require('fs');
const path = require('path');
const express = require('express');
const { json } = require('express');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

const accountsPath = path.resolve(__dirname, './json/accounts.json');

const accountData = fs.readFileSync(accountsPath, 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
  path.resolve(__dirname, './json/users.json'),
  'utf8',
);
const users = JSON.parse(userData);

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var viewPath = path.join(__dirname, './views');

app.set('views', viewPath);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public/')));

function routerFunction() {
  router.route('/').get((req, res) => {
    res.render('index', { title: 'Account Summary', accounts });
  });

  // router.route('/profile ').get((req, res) => {
  //   res.render('profile', { user: users[0] });
  // });

  return router;
}

app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
});
app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
});
app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
});

app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});

app.get('/transfer', (req, res) => {
  res.render('transfer');
});

app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;

  accounts[from].balance = accounts[from].balance - amount;
  accounts[to].balance = parseInt(accounts[to].balance) + parseInt(amount, 10);

  const accountsJSON = JSON.stringify(accounts, null, 4);

  fs.writeFileSync(accountsPath, accountsJSON, 'utf8');

  res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});

app.post('/payment', (req, res) => {
  const { from, to, amount } = req.body;

  accounts.credit.balance -= parseInt(amount);
  accounts.credit.available = parseInt(amount, 10);

  const accountsJSON = JSON.stringify(accounts, null, 4);

  fs.writeFileSync(accountsPath, accountsJSON, 'utf8');

  res.render('payment ', {
    message: 'Payment Successful',
    account: accounts.credit,
  });
});
app.use('/', routerFunction());

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
