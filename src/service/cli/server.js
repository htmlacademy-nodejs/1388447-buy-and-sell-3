'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {DEFAULT_PORT} = require(`../../constants`);
const apiRouter = require(`../api`);

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = +customPort || DEFAULT_PORT;
    const app = express();

    app.use(express.json());
    await apiRouter(app);
    app.listen(port, () => console.info(chalk.green(`Waiting for connection on ${port}`)));
    app.on(`error`, ({message}) => console.error(`Server creation error: ${message}`));
  },
};
