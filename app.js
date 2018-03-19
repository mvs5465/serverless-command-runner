const winston = require('winston');
const yaml = require('js-yaml');
const fs   = require('fs');
const RestRequest = require('./RestRequest.js');
const ShellCommand = require('./ShellCommand.js');

const logger = winston.createLogger({
  //level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

// Env configuration
const { LOG_LEVEL = 'error', DRY_RUN = false, FILE_PATH = './files/sample2.yaml'} = process.env;

var main = function(){

  console.log(`FILE PATH: ${FILE_PATH}`);
  console.log(`DRY RUN: ${DRY_RUN}`);

  let doc = null;
  try {
    // parse the yaml into a JS object
    doc = yaml.safeLoad(fs.readFileSync(FILE_PATH, 'utf8'));
  } catch (e) {
    logger.log('error', `Unable to parse YAML: ${e}`);
    return -1;
  }

  let commands = doc[1].commands;

  commands.map(command => {

    if (command.configuration != null && command.configuration.command != null) {
      // logger.log('info', `Detected a shell command: ${command.configuration.command}`);
      // var command = new ShellCommand(command.configuration.command, DRY_RUN);
      // command.execute();
    } else {
      logger.log('info', `Detected a REST request: ${command}`);
      // url, path, timeout, method, headers, checkResponseCode
      var parsedUrl = parseUrl(command.remoteUrl);
      const headers = command.headers || {'Content-Type': 'application/json'};
      // url, path, timeout, method, headers, checkResponseCode, retries, printResponse
      var rcmd = new RestRequest(parsedUrl[0] + 'google.com', parsedUrl[1], command.timeout, command.method, headers, command.retries, command.checkResponseCode);
      rcmd.execute();
    }

  });
}

function parseUrl(url) {
  const domain = url.match('.*(?=\\$)');
  //const endpoint = url.match('/api/.*');
  const endpoint = 'index.html';

  logger.log('info', `DOMAIN: ${domain}`);
  logger.log('info', `ENDPOINT: ${endpoint}`);

  return [domain, endpoint];
}

if (require.main === module) {
  main();
}

///////////////
//// NOTES ////
///////////////


/// ( x ) JSON LOGS
/// ( x ) LOG level
/// ( x ) logging libraries? = winston
/// ( x ) dry run
/// ( x ) -- if dry run --> env var? --> dont do anything, just log what you would have done
/// ( x ) Find out if it is a URL or bash command?

/// ( ) add a field for headers
/// ( ) validate ssl certificaties (skip for now)
