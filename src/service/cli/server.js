'use strict';

const express = require(`express`);
const {DEFAULT_PORT, HttpCode} = require(`../../constants`);
const apiRouter = require(`../api`);
const {getLogger} = require(`../lib/logger`);

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = +customPort || DEFAULT_PORT;
    const logger = getLogger({name: `api`});
    const app = express();

    try {
      app.use(express.json());
      app.use((req, res, next) => {
        logger.debug(`Request on route ${req.url}`);
        res.on(`finish`, () => {
          logger.info(`Response status code ${res.statusCode}`);
        });
        next();
      });
      await apiRouter(app);
      app.use((err, _req, _res, _next) => {
        logger.error(`An error occurred on processing request: ${err.message}`);
      });
      app.use((req, res) => {
        res.status(HttpCode.NOT_FOUND);
        logger.error(`Route not found: ${req.url}`);
      });

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
