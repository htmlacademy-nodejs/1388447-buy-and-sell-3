"use strict";

const { Router } = require("express");

const offersRoutes = new Router();

offersRoutes.get(`/`, (req, res) => res.end(`/offers`));
offersRoutes.get(`/:id`, (req, res) => res.end(`/offers/:id`));
offersRoutes.get(`/add`, (req, res) => res.end(`/offers/add`));
offersRoutes.get(`/category/:id`, (req, res) =>
  res.end(`/offers/category/:id`)
);
offersRoutes.get(`/edit/:id`, (req, res) => res.end(`/offers/edit/:id`));

module.exports = offersRoutes;
