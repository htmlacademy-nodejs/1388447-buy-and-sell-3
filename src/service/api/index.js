'use strict';

const {Router} = require(`express`);
const offer = require(`./offer`);
const category = require(`./category`);
const search = require(`./search`);
const {OfferService, CategoryService, SearchService, CommentService} = require(`../data-service`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const {Route} = require(`../../constants`);

module.exports = async (app) => {
  const router = new Router();
  defineModels(sequelize);

  app.use(Route.API, router);

  offer(router, new OfferService(sequelize), new CommentService(sequelize));
  category(router, new CategoryService(sequelize));
  search(router, new SearchService(sequelize));
};
