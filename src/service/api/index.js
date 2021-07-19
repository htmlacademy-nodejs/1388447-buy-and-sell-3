'use strict';

const {Router} = require(`express`);
const offer = require(`./offer`);
const category = require(`./category`);
const search = require(`./search`);
const {OfferService, CategoryService, SearchService, CommentService} = require(`../data-service`);
const {getMockData} = require(`../lib/get-mock-data`);
const {Route} = require(`../../constants`);

module.exports = async (app) => {
  const mockData = await getMockData();
  const router = new Router();

  app.use(Route.API, router);

  offer(router, new OfferService(mockData), new CommentService());
  category(router, new CategoryService(mockData));
  search(router, new SearchService(mockData));
};
