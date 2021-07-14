'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

module.exports = (app, service) => {
  const router = new Router();
  app.use(`/search`, router);

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
