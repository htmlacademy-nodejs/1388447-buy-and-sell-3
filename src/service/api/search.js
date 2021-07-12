'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/search`, router);

  router.get(`/`, (req, res) => {
    const {query = ``} = req.query;
    if(!query) {
      res.status(HttpCode.BAD_REQUEST)
        .json([]);
    }

    const result = service.findOffer(query);

    if(!result) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Query ${query} not found`);
    }

    res.status(HttpCode.OK)
      .json(result);
  })
};
