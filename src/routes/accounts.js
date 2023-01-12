const express = require('express');

const router = express.Router();

const { accounts } = require('../data');

router.route('/savings').get((req, res) => {
  res.render('account', { account: accounts.savings });
});
router.route('/checking').get((req, res) => {
  res.render('account', { account: accounts.checking });
});
router.route('/credit').get((req, res) => {
  res.render('account', { account: accounts.credit });
});

module.exports = router;
