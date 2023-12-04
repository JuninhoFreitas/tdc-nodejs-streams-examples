const fs = require('fs');
const csvtojson = require('csvtojson');

console.profile('1-suspicious-csv-to-json');
const read = fs.readFileSync('accounts.csv', 'utf8').toString();

csvtojson()
  .fromString(read)
  .then((jsonObj) => {
    console.log(jsonObj);
    fs.writeFileSync('accounts2.json', JSON.stringify(jsonObj, null, 2));
  });

const converter = csvtojson({ noheader: false });