'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const mainRoutes = new Router();
const api = getAPI();

mainRoutes.get(`/`, async (req, res) => {
  try {
    const [offers, categories] = await Promise.all([api.getOffers(false), api.getCategories(true)]);
    res.render(`main`, {offers, categories});

  } catch (error) {
    console.error(error);
  }

});
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/search`, async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);
    res.render(`search-result`, {results});

  } catch (err) {
    res.render(`search-result`, {results: []});
  }

});

module.exports = mainRoutes;
