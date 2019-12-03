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
    let inputKey = args._[1];
    let inpuValue = args._[2];
    let result = _.find(data, function(_val){
        return ( (_val[inputKey] !== undefined));
    });

    if((result !== undefined)){
        console.error('key has been inserted please use a different key');
    } else {
        let obj = {
            [inputKey] : inpuValue
        };
        data.push(obj);
        writeToFile(COLLECTION_NAME, data);
    }
  };

  const getValueByKey = (_key) => {
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

  const displayData = () => {
    _.each(data, function(_val){
        console.log(_val);
    });
  };
    
  switch (cmd) {
    case 'add':
        addKeyValue();
        break;
    case 'list':
        displayData();
        break; 
    case 'get':
        getValueByKey(args._[1]);
    break; 
    case 'remove':
        removeObjByKey(args._[1]);
        break; 
    default:
        console.error(`"${cmd}" is not a valid command!`);
        break;
  }

};