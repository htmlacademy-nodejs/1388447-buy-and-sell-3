'use strict';

const {Router} = require(`express`);

const offersRoutes = new Router();

offersRoutes.get(`/`, (req, res) => res.render(`ticket`));
offersRoutes.get(`/:id`, (req, res) => res.render(`ticket`));
offersRoutes.get(`/add`, (req, res) => res.render(`new-ticket`));
offersRoutes.get(`/category/:id`, (req, res) =>
  res.render(`category`)
);
offersRoutes.get(`/edit/:id`, (req, res) => res.render(`ticket-edit`));

module.exports = offersRoutes;
