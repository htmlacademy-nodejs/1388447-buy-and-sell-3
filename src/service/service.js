'use strict';

const chalk = require(`chalk`);
const {ExitCode, USER_ARGV_INDEX, DEFAULT_COMMAND} = require(`../constants`);
const {Cli} = require(`./cli`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

(async () => {
  try {
    if (userArguments.length === 0 || !Cli[userCommand]) {
      await Cli[DEFAULT_COMMAND].run();
      return;
    }
    await Cli[userCommand].run(userArguments.slice(1));
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(ExitCode.ERROR);
  }
})();
