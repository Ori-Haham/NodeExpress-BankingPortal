const express = require('express');

const router = express.Router();

const { accounts, writeJSON } = require('../data');

router.route('/transfer').get((req, res) => {
  res.render('transfer');
});

router.route('/transfer').post((req, res) => {
  const { from, to, amount } = req.body;

  accounts[from].balance = accounts[from].balance - amount;
  accounts[to].balance = parseInt(accounts[to].balance) + parseInt(amount, 10);

  writeJSON();

  res.render('transfer', { message: 'Transfer Completed' });
});

router.route('/payment').get((req, res) => {
  res.render('payment', { account: accounts.credit });
});

router.route('/payment').post((req, res) => {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available += parseInt(req.body.amount);
  writeJSON();
  res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit,
  });
});

module.exports = router;
