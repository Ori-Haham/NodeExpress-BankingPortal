const fs = require('fs');
const path = require('path');

const accountsPath = path.resolve(__dirname, './json/accounts.json');

const accountData = fs.readFileSync(accountsPath, 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
  path.resolve(__dirname, './json/users.json'),
  'utf8',
);
const users = JSON.parse(userData);

const writeJSON = () => {
  const accountsJSON = JSON.stringify(accounts, null, 4);

  fs.writeFileSync(accountsPath, accountsJSON, 'utf8');
};

module.exports = { accountsPath, accounts, users, writeJSON };
