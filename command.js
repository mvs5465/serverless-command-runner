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

class Command {

  constructor(command) {

    // if 'command' field is present, run it as a bash command
    // else assume it is a rest request
    if (command.configuration != null && command.configuration.command != null) {
      logger.log('info', `Detected a shell command: ${command.configuration.command}`);
      this.isCommand = true;
      this.toBeRun = command.configuration.command;
    } else {
      logger.log('info', `Detected a REST request: ${command}`);
      this.isCommand = false;

      const domain = command.remoteUrl.match('.*(?=\\$)');
      const endpoint = command.remoteUrl.match('/api/.*');

      logger.log('info', `DOMAIN: ${domain}`);
      logger.log('info', `ENDPOINT: ${endpoint}`);

      const headers = command.headers || {'Content-Type': 'application/json'};

      this.options = {
        url: domain + 'google.com',
        path: endpoint,
        timeout: command.timeout,
        method: command.method,
        headers: headers
      };
    }
  }

  printInfo() {
    logger.log('info', `Url: ${this.options.url}`);
    logger.log('info', `Resource path: ${this.options.path}`);
    logger.log('info', `Timeout: ${this.options.timeout}`);
    logger.log('info', `Type: ${this.options.method}`);
  }

  // send the request
  execute(dryRun) {

    logger.log('info', 'Executing...');

    if (this.isCommand) {
      if (dryRun === true) {
        logger.log('info', `Dry run! Would have run a command: ${this.toBeRun}`);
      } else {
        if(false) { // TODO - variable replacement messes this up
          exec(this.toBeRun, function (error, stdout, stderr) {
            logger.log('info', 'success: %s', stdout);
            logger.log('error', 'error: %s', stderr);
            if (error !== null) {
              logger.log(`error: ${error}`);
            }
          });
        }
      }
    } else {
      if (dryRun === true) {
        logger.log('info', 'Dry run! Would have sent request with parameters: ');
        this.printInfo();
      } else {
        axios(this.options).then(function(response){
          if (this.options.printResponse) {
            logger.log('info', response.data);
            logger.log('info', response.status);
          }
        }).catch(function (error) {
          console.log('error: ' + error);
          logger.log('error', (error));
        });
      }
    }
  }


}

module.exports = Command;
