'use strict';

const {Router} = require(`express`);
const offer = require(`./offer`);
const category = require(`./category`);
const search = require(`./search`);
const {OfferService, CategoryService, SearchService, CommentService} = require(`../data-service`);
const {getMockData} = require(`../lib/get-mock-data`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  offer(app, new OfferService(mockData), new CommentService());
  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
