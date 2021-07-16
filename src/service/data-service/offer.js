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
    const [offer] = this._offers.filter((item) => item.id === id);

    if (!offer || offer.length === 0) {
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
    const index = this._offers.findIndex((item) => item.id === id);
    const upDatedOffer = extend(this._offers[index], offer);

    this._offers = [...this._offers.slice(0, index), upDatedOffer, ...this._offers.slice(index + 1)];

    return upDatedOffer;
  }

}

module.exports = Offer;
