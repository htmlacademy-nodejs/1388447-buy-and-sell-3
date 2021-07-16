'use strict';

const {Router} = require(`express`);
const offerValidator = require(`../middleware/offer-validator`);
const commentValidator = require(`../middleware/comment-validator`);
const offerExist = require(`../middleware/offer-exist`);
const {HttpCode} = require(`../../constants`);

module.exports = (app, offerService, commentService) => {
  const router = new Router();
  app.use(`/offers`, router);

  router.get(`/`, (req, res) => {
    res.status(HttpCode.OK).json(offerService.findAll());
  });

  router.get(`/:offerId`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;

    if (!offer) {
      const {offerId} = req.params;

      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }
    return res.status(HttpCode.OK).json(offer);
  });

  router.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    res.status(HttpCode.CREATED)
      .json(offer);
  });

  router.put(`/:offerId`, [offerValidator, offerExist(offerService)], (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.upDate(offerId, req.body);

    res.status(HttpCode.OK)
      .json(offer);
  });

  router.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.remove(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found offer with ${offerId} to remove`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  router.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;

    const comments = commentService.findAll(offer);

    res.status(HttpCode.OK)
      .json(comments);
  });

  router.delete(`/:offersId/comments/:commentId`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const comment = commentService.remove(commentId, offer);

    if (!comment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found comment with ${commentId} to remove`);
    }

    return res.status(HttpCode.OK)
      .json(comment);
  });

  router.post(`/:offerId/comments`, [offerExist(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(req.body, offer);

    res.status(HttpCode.OK)
      .json(comment);
  });
};
