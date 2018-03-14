const logger = require('winston');
const axios = require('axios');

class Command {
  
  constructor(url, path, timeout, methType) {
    
    this.options = {
      url: url,
      path: path,
      timeout: timeout,
      method: methType,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
  
  printInfo() {
    logger.info('Url: ' + this.options.url);
    logger.info('Resource path: ' + this.options.path);
    logger.info('Timeout: ' + this.options.timeout);
    logger.info('Type: ' + this.options.method);
  }
  
  // send the request
  execute() {
    
    console.log('Sending request...');
    
    axios(this.options).then(function(response){
      console.log("the thing happened");
      console.log(response.data); // ex.: { user: 'Your User'}
      console.log(response.status); // ex.: 200
    }).catch(function (error) {
    console.log(error);
  }); 
  }
  
  
}

module.exports = Command;