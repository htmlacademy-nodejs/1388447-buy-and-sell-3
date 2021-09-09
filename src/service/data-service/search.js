'use strict';

const {Op} = require(`sequelize`);
const Aliase = require(`../models/aliase`);

class SearchService {
  constructor(sequelize) {
    this._Offers = sequelize.models.Offer;
  }

  async findAll(searchText) {
    const offers = await this._Offers.findAll({
      where: {
        title: {
          [Op.substring]: searchText
        }
      },
      include: [Aliase.CATEGORIES],
    });

    return offers.map((offer) => offer.get());
  }
}

module.exports = SearchService;
