const logger = require('winston');
const yaml = require('js-yaml');
const fs   = require('fs');
const Command = require("./command.js");



var main = function(){
  
  let doc = null;
  try {
    // parse the yaml into a JS object
    doc = yaml.safeLoad(fs.readFileSync('./files/sample.yaml', 'utf8'));
  } catch (e) {
    logger.error('Unable to parse YAML: %s', e);
  }
  
  if (doc === null) {
    logger.error('Unable to parse YAML: null');
    return -1;
  }
  
  let commands = doc[1].commands;
  
  commands.map(command => {
      actualCall = new Command(command.remoteUrl, "", command.timeout, command.method);
      actualCall.printInfo();
      actualCall.execute();
    })
  
    /*
  for (var i = 0; i < commands.length; i++) {
    console.log('remoteurl: ' + commands[i].remoteUrl);
    var actualCall = new Command(commands[i].remoteUrl, "", commands[i].timeout, commands[i].method);
    actualCall.printInfo();
  }
  */
  
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



// create object that has all relevant fields of command
// autoparse into fields?

// validate urls
// validate fields

// iterate over commands
// create an object for each command
// execute each command

// save responses of each command
// send them async?

