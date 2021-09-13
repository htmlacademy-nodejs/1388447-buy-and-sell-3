'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const {getLogger} = require(`../lib/logger`);

module.exports = (app, service) => {
  const router = new Router();
  const logger = getLogger({name: `api/categories`});
  app.use(`/categories`, router);

  router.get(`/`, async (req, res) => {
    try {
      const {count} = req.query;
      const categories = await service.findAll(count);
      res.status(HttpCode.OK)
        .json(categories);
    } catch (err) {
      logger.error(`An error occurred on processing request: ${err.message}. Stack ${err.stack}`);
    }
  });
};
