const minimist = require('minimist');
const _ = require('underscore');
const fs = require('fs');
const COLLECTION_NAME = './db/stores.json';

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const cmd = args._[0];
  let data = JSON.parse(fs.readFileSync(COLLECTION_NAME, 'utf8'));

  const addKeyValue = () => {
    //TODO error out if there is no 3rd and 4th args
    //TODO error if a key existed
    let inputKey = args._[1];
    let inpuValue = args._[2];
    let obj = {
        [inputKey] : inpuValue
    };
    data.push(obj);
    fs.writeFileSync(COLLECTION_NAME, JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
  };

  const getKey = (_key) => {
    let inputKey = _key;
    let result = _.find(data, function(_val){
        return ( (_val[inputKey] !== undefined));
    });
    result = (result !== undefined) ? result[inputKey] : 'key is not defined';
    console.log(result);
  };
    
  switch (cmd) {
    case 'add':
        addKeyValue();
      break;
    case 'list':
        //TODO improvement to display data nicely
        console.log("data = " + JSON.stringify(data));
    break; 
    case 'get':
        getKey(args._[1]);
    break; 
    case 'remove':
        console.log("today!");
    break; 
    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }

};