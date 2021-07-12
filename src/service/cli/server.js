'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {DEFAULT_PORT, API_PREFIX} = require(`../../constants`);
const routes = require(`../api`);

const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = +customPort || DEFAULT_PORT;

    app.listen(port, () => console.info(chalk.green(`Waiting for connection on ${port}`)));
    app.on(`error`, ({message}) => console.error(`Server creation error: ${message}`));
  },
};
