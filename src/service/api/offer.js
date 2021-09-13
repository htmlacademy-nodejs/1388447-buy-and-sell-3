'use strict';

const {Router} = require(`express`);
const offerValidator = require(`../middleware/offer-validator`);
const commentValidator = require(`../middleware/comment-validator`);
const offerExist = require(`../middleware/offer-exist`);
const {HttpCode} = require(`../../constants`);
const {getLogger} = require(`../lib/logger`);

module.exports = (app, offerService, commentService) => {
  const router = new Router();
  const logger = getLogger({name: `api/offers`});
  app.use(`/offers`, router);

  router.get(`/`, async (req, res) => {
    try {
      const {comments} = req.query;
      const offers = await offerService.findAll(comments);
      res.status(HttpCode.OK).json(offers);

    } catch (err) {
      logger.error(`An error occurred on processing request: ${err.message}`);
    }
  });

  router.get(`/:offerId`, offerExist(offerService), async (req, res) => {
    try {
      const {offer} = res.locals;

      if (!offer) {
        const {offerId} = req.params;

        res.status(HttpCode.NOT_FOUND)
          .send(`Not found with ${offerId}`);
      } else {
        res.status(HttpCode.OK).json(offer);
      }

    } catch (err) {
      logger.error(`An error occurred on processing request: ${err.message}`);
    }
  });

  router.post(`/`, offerValidator, async (req, res) => {
    try {
      const offer = await offerService.create(req.body);

      res.status(HttpCode.CREATED)
        .json(offer);
    } catch (err) {
      logger.error(`An error occurred on processing request: ${err.message}`);
    }
  });

  router.put(`/:offerId`, [offerValidator, offerExist(offerService)], async (req, res) => {
    try {
      const {offerId} = req.params;
      const offer = await offerService.upDate(offerId, req.body);

      res.status(HttpCode.OK)
        .json(offer);
    } catch (err) {
      logger.error(`An error occurred on processing request: ${err.message}`);
    }
  });

  router.delete(`/:offerId`, async (req, res) => {
    try {
      const {offerId} = req.params;
      const offer = await offerService.remove(offerId);

      if (!offer) {
        res.status(HttpCode.NOT_FOUND)
          .send(`Not found offer with ${offerId} to remove`);
      } else {
        res.status(HttpCode.OK)
          .json(offer);
      }

    } catch (err) {
      logger.error(`An error occurred on processing request: ${err.message}`);
    }
  });

  router.get(`/:offerId/comments`, offerExist(offerService), async (req, res) => {
    try {
      const {offer} = res.locals;

      const comments = await commentService.findAll(offer.id);

      res.status(HttpCode.OK)
        .json(comments);
    } catch (err) {
      logger.error(`An error occurred on processing request: ${err.message}`);
    }
  });

  router.delete(`/:offersId/comments/:commentId`, offerExist(offerService), async (req, res) => {
    try {
      const {commentId} = req.params;
      const comment = await commentService.remove(commentId);

      if (!comment) {
        res.status(HttpCode.NOT_FOUND)
          .send(`Not found comment with ${commentId} to remove`);
      } else {
        res.status(HttpCode.OK)
          .json(comment);
      }

    } catch (err) {
      logger.error(`An error occurred on processing request: ${err.message}`);
    }
  });

  router.post(`/:offerId/comments`, [offerExist(offerService), commentValidator], async (req, res) => {
    try {
      const {offer} = res.locals;
      const comment = await commentService.create(offer.id, req.body);

      res.status(HttpCode.OK)
        .json(comment);
    } catch (err) {
      logger.error(`An error occurred on processing request: ${err.message}`);
    }
  });
};
