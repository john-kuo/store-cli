const minimist = require('minimist');
const _ = require('underscore');
const fs = require('fs');
const COLLECTION_NAME = './db/stores.json';

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const cmd = args._[0];
  let data = JSON.parse(fs.readFileSync(COLLECTION_NAME, 'utf8'));

  const writeToFile = (_file_name, _data) => {
    fs.writeFileSync(_file_name, JSON.stringify(_data), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
  };

  const addKeyValue = () => {
    //TODO error out if there is no 3rd and 4th args
    //TODO error if a key existed
    let inputKey = args._[1];
    let inpuValue = args._[2];
    let obj = {
        [inputKey] : inpuValue
    };
    data.push(obj);
    writeToFile(COLLECTION_NAME, data);
  };

  const getKey = (_key) => {
    let inputKey = _key;
    let result = _.find(data, function(_val){
        return ( (_val[inputKey] !== undefined));
    });
    result = (result !== undefined) ? result[inputKey] : 'key is not defined';
    console.log(result);
  };

  const removeObjByKey = (_key) => {
    let isKeyExisted = (_obj) => _obj[_key] !== undefined;  
    let index = data.findIndex(isKeyExisted);
    if(index !== -1){
        data.splice(index, 1);
        writeToFile(COLLECTION_NAME, data);
        console.log('key ' + args._[1] + ' has been removed');
    } else {
        console.error('unable to remove value by key ' + args._[1]);
    }
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
        removeObjByKey(args._[1]);
        break; 
    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }

};