const winston = require('winston');
const yaml = require('js-yaml');
const fs   = require('fs');
const Command = require("./command.js");

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

// Env configuration
const { LOG_LEVEL = 'error', DRY_RUN = false, FILE_PATH = './files/sample.yaml'} = process.env;

var main = function(){

  let doc = null;
  try {
    // parse the yaml into a JS object
    doc = yaml.safeLoad(fs.readFileSync('./files/sample.yaml', 'utf8'));
  } catch (e) {
    logger.log('error', `Unable to parse YAML: ${e}`);
    return -1;
  }

  // TODO unnecessary?
  // if (doc === null) {
  //   logger.log('error', 'Unable to parse YAML: null');
  //   return -1;
  // }

  let commands = doc[1].commands;

  commands.map(command => {
    var actualCall = new Command(command);
    logger.log('info', `Dry run? ${DRY_RUN}`);
    actualCall.execute(false); // TODO replace this with env var
  });

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
