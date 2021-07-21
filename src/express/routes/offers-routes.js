'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const offersRoutes = new Router();
const api = getAPI();

offersRoutes.get(`/`, (req, res) => res.render(`ticket`));
offersRoutes.get(`/:id`, (req, res) => res.render(`ticket`));
offersRoutes.get(`/add`, (req, res) => res.render(`new-ticket`));
offersRoutes.get(`/category/:id`, (req, res) =>
  res.render(`category`)
);
offersRoutes.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const offer = await api.getOffer(id);
  const categories = await api.getCategories();

  res.render(`ticket-edit`, {offer, categories});
});

module.exports = offersRoutes;
