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


var main = function(){

  let doc = null;
  try {
    // parse the yaml into a JS object
    doc = yaml.safeLoad(fs.readFileSync('./files/sample.yaml', 'utf8'));
  } catch (e) {
    logger.log('error', 'Unable to parse YAML: %s', e);
  }

  if (doc === null) {
    logger.log('error', 'Unable to parse YAML: null');
    return -1;
  }

  let commands = doc[1].commands;

  commands.map(command => {
      actualCall = new Command(command.remoteUrl, "", command.timeout, command.method);
      actualCall.printInfo();
      actualCall.execute();
    })

}

if (require.main === module) {
  main();
}

///////////////
//// NOTES ////
///////////////


/// JSON LOGS
/// LOG level
// logging libraries? = winston
// dry run
// -- if dry run --> env var? --> dont do anything, just log what you would have done

// add a field for headers
// validate ssl certificaties (skip for now)
