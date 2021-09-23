'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);


const OFFERS_PER_PAGE = 8;

const mainRoutes = new Router();
const api = getAPI();

mainRoutes.get(`/`, async (req, res) => {
  try {
    let {page = 1} = req.query;
    page = +page;
    const limit = OFFERS_PER_PAGE;
    const offset = (page - 1) * OFFERS_PER_PAGE;
    const [{count, offers},
      categories
    ] = await Promise.all([
      api.getOffers({limit, offset}),
      api.getCategories(true)]);

    const totalPages = Math.ceil(count / OFFERS_PER_PAGE);
    res.render(`main`, {offers, page, totalPages, categories});

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
