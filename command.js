const winston = require('winston');
const axios = require('axios');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

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
    logger.log('info', 'Url: ' + this.options.url);
    logger.log('info', 'Resource path: ' + this.options.path);
    logger.log('info', 'Timeout: ' + this.options.timeout);
    logger.log('info', 'Type: ' + this.options.method);
  }

  // send the request
  execute() {

    logger.log('info', 'Sending request...');

    axios(this.options).then(function(response){
      logger.log('info', "the thing happened");
      logger.log('info', response.data);
      logger.log('info', response.status);
    }).catch(function (error) {
    logger.log('error', (error));
  });
  }


}

module.exports = Command;
