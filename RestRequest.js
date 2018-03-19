// abstract away rest requesting
// TODO:
// (  ) Send request when ready - some sort of execute() function
// (  ) Option to repeat request
// (  ) Option to use timeout
// (  ) Option to check response code
// (  ) Option to pick request type
// (  ) Option to add headers
// (  ) Option to validate response?

const winston = require('winston');
const axios = require('axios');
const util = require('util')
const exec = require('child_process').exec;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

class RestRequest {

  constructor(url, path, timeout, method, headers, checkResponseCode, retries, printResponse) {

    this.options = {
      url: url,
      path: path,
      timeout: timeout,
      method: method,
      headers: headers
    };

    logger.info(`Rest request options: ${this.options}`);
    logger.info(`Domain for rest request: ${this.options.url}`);
    logger.info(`Path for rest request: ${this.options.path}`);

    this.checkResponseCode = checkResponseCode;
    this.retries = retries;
  }

  execute() {

    logger.info('Executing rest request...');
    axios(this.options).then((response) => {
      if (printResp) {
        logger.info(`Print response true`);
        if (this.checkResponseCode) {
          if (response.ok) {
            logger.info(`Response was OK: ${response.status}`);
          } else {
            logger.info(`Response was not OK: ${response.status}`);
          }
        }
      } else {
        logger.info(`Print response false`);
      }
    }).catch(function (error) {
      if (error.response) {
        logger.error(`HTTP error on response: ${error.response}`);
      } else if (error.request) {
        logger.error(`HTTP error in request: ${error.request}`);
      } else {
        logger.error(`HTTP error but in neither request or response (WTF): ${error}`);
      }
    });
  }
}


module.exports = RestRequest;
