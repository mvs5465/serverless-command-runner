const util = require('util')
const exec = require('child_process').exec;
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

class ShellCommand {

  constructor(command, dryRun) {
    this.command = command;
    this.dryRun = dryRun;
    console.log(`DRY RUN? ${this.dryRun}`);
  }

  execute() {
    if (this.dryRun) {
      logger.info(`Dry run! Would have executed command: \[${this.command}\]`);
    } else {
      logger.info(`Executing command: \[${this.command}\]`);
      exec(this.command, function (error, stdout, stderr) {
        if (error !== null) {
          logger.error(`Shell command execution error: ${error}`);
        }
        if (stderr !== "") {
          logger.error(`Shell command standard error stream output: ${stderr}`);
        }
        if (stdout !== "") {
          logger.info(`Shell command standard output stream: ${stdout}`);
        } else {
          logger.error('No output from shell command.');
        }
      });
    }
  }
}

module.exports = ShellCommand;
