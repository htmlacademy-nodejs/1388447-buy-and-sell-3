'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const {getLogger} = require(`../lib/logger`);

module.exports = (app, service) => {
  const router = new Router();
  const logger = getLogger({name: `api/search`});

  app.use((req, res, next) => {
    logger.debug(`Request on route ${req.url}`);
    res.on(`finish`, () => {
      logger.info(`Response status code ${res.statusCode}`);
    });
    next();
  });
  app.use((err, _req, _res, _next) => {
    logger.error(`An error occurred on processing request: ${err.message}`);
  });
  app.use(`/search`, router);
  app.use((req, res) => {
    res.status(HttpCode.NOT_FOUND);
    logger.error(`Route not found: ${req.url}`);
  });

  router.get(`/`, (req, res) => {
    const {query = ``} = req.query;
    if (!query) {
      return res.status(HttpCode.BAD_REQUEST)
        .json([]);
    }

    const result = service.findOffer(query);

    if (!result) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Query ${query} not found`);
    }

    return res.status(HttpCode.OK)
      .json(result);
  });
};
