'use strict';

const express = require(`express`);
const {DEFAULT_PORT, HttpCode} = require(`../../constants`);
const apiRouter = require(`../api`);
const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = +customPort || DEFAULT_PORT;
    const logger = getLogger({name: `api`});
    const app = express();

    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

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

      app.listen(port, () => logger.info(`Listening to connections on ${port}`));
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
    }
  },
};
