'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const upload = require(`../multer-config`);

const offersRoutes = new Router();
const api = getAPI();

offersRoutes.get(`/`, (req, res) => {
  res.render(`ticket`);
});

offersRoutes.get(`/:id`, async (req, res) => {
  try {
    const {id} = req.params;
    const offer = await api.getOffer(id, true);
    console.log(`offer`, offer);
    res.render(`offers/ticket`, {offer});

  } catch (err) {
    console.error(`An error occurred on processing request: ${err.message}`);
  }
});

offersRoutes.get(`/add`, (req, res) => {
  res.render(`new-ticket`);
});

offersRoutes.get(`/category/:id`, (req, res) => {
  res.render(`category`);
});

offersRoutes.get(`/edit/:id`, async (req, res) => {
  try {
    const {id} = req.params;
    const offer = await api.getOffer(id);
    const categories = await api.getCategories();

    res.render(`ticket-edit`, {offer, categories});

  } catch (err) {
    console.error(`An error occurred on processing request: ${err.message}`);
  }
});

offersRoutes.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const offerData = {
    picture: file.filename,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    category: body.category,
  };

  try {
    await api.createOffer(offerData);
    res.redirect(`/my`);
  } catch (err) {
    res.redirect(`back`);
  }
});

module.exports = offersRoutes;
