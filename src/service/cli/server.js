'use strict';

const express = require(`express`);
const {DEFAULT_PORT} = require(`../../constants`);
const apiRouter = require(`../api`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api`});

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = +customPort || DEFAULT_PORT;
    const app = express();

    try {
      app.use(express.json());
      await apiRouter(app);

      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }
        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
    }
  },
};
