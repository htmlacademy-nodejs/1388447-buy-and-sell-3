"use strict";

const { Router } = require(`express`);

const offersRouter = new Router();

offersRouter.get(`/`, (req, res) => res.end(`/offers`));
offersRouter.get(`/:id`, (req, res) => res.end(`/offers/:id`));
offersRouter.get(`/add`, (req, res) => res.end(`/offers/add`));
offersRouter.get(`/category/:id`, (req, res) =>
  res.end(`/offers/category/:id`)
);
offersRouter.get(`/edit/:id`, (req, res) => res.end(`/offers/edit/:id`));
