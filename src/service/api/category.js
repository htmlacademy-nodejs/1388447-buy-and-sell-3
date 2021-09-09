'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
// const {getLogger} = require(`../lib/logger`);
// const {logger} = require(`../lib/logger`);

module.exports = (app, service) => {
  const router = new Router();
  // const logger = getLogger({name: `api/categories`});

  // app.use((req, res, next) => {
  //   logger.debug(`Request on route ${req.url}`);
  //   res.on(`finish`, () => {
  //     logger.info(`Response status code ${res.statusCode}`);
  //   });
  //   next();
  // });
  // app.use((err, _req, _res, _next) => {
  //   logger.error(`An error occurred on processing request: ${err.message}`);
  // });
  app.use(`/categories`, router);
  // app.use((req, res) => {
  //   res.status(HttpCode.NOT_FOUND);
  //   logger.error(`Route not found: ${req.url}`);
  // });

  router.get(`/`, async (req, res) => {
    const {count} = req.query;
    const categories = await service.findAll(count);
    res.status(HttpCode.OK)
      .json(categories);
  });
};
