'use strict';

const {ExitCode, USER_ARGV_INDEX, DEFAULT_COMMAND} = require('../constants');
const {Cli} = require('./cli');

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

(async () => {
  try {
    if (userArguments.length === 0 || !Cli[userCommand]) {
      await Cli[DEFAULT_COMMAND].run();
    }
    await Cli[userCommand].run(userArguments.slice(1));
  } catch
    (err) {
    console.error(err);
    process.exit(ExitCode.ERROR);
  }
})();
