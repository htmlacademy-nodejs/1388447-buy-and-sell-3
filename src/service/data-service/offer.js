'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_LENGTH_ID} = require(`../../constants`);
const {extend} = require(`../../utils`);

class Offer {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const newOffer = extend({id: nanoid(MAX_LENGTH_ID), comments: []}, offer);
    this._offers.push(newOffer);

    return newOffer;
  }

  remove(id) {
    const offer = this._offers.filter((item) => item.id === id);

    if (!offer) {
      return null;
    }

    this._offers = this._offers.filter((item) => item.id !== id);

    return offer;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    const offer = this._offers.find((item) => item.id === id);

    if (!offer) {
      return null;
    }

    return offer;
  }

  upDate(id, offer) {
    const oldOffer = this._offers.find((item) => item.id === id);

    return extend(oldOffer, offer);
  }

}

module.exports = Offer;
