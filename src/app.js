const fs = require('fs');
const path = require('path');
const express = require('express');
const { json } = require('express');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

const { accountsPath, accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

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

app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});

// app.post('/payment', (req, res) => {
//   const { amount } = req.body;

//   accounts.credit.balance -= amount;
//   accounts.credit.available = parseInt(amount, 10);

//   const accountsJSON = JSON.stringify(accounts, null, 4);

//   fs.writeFileSync(accountsPath, accountsJSON, 'utf8');

//   res.render('payment', {
//     message: 'Payment Successful',
//     account: accounts.credit,
//   });
// });

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.use('/', routerFunction());

app.listen(port, () => {
  console.log(`PS Project Running on port 3000! ${port}`);
});
