const fs = require('fs');
const faker = require('faker');

const generateFakeAccounts = (count) => {
  const accounts = [];
  for (let i = 0; i < count; i++) {
    const account = {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    accounts.push(account);
  }
  return accounts;
};

const generateCSV = (accounts, filePath) => {
  let csv = 'id,name,email,username,password\n';
  accounts.forEach((account) => {
    csv += `${account.id},${account.name},${account.email},${account.username},${account.password}\n`;
  });
  fs.writeFileSync(filePath, csv);
};

const numAccounts = 1e5;
const accounts = generateFakeAccounts(numAccounts);
const filePath = 'accounts.csv';
generateCSV(accounts, filePath);
