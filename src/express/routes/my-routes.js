'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const myRoutes = new Router();
const api = getAPI();

myRoutes.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`my-tickets`, {offers});
});

myRoutes.get(`/comments`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`comments`, {offers: offers.slice(0, 3)});
});

module.exports = myRoutes;
