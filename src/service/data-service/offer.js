'use strict';

const Aliase = require(`../models/aliase`);

class OfferService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._Comment = sequelize.models.Comment;
  }

  async create(offerData) {
    const offer = await this._Offer.create(offerData);
    const categoryIds = offerData.categories.map((id) => +id);
    await offer.addCategories(categoryIds);
    return offer.get();
  }

  async remove(id) {
    const removedRows = await this._Offer.destroy({
      where: {id}
    });

    return !!removedRows;
  }

  async findAll(needComments) {
    const include = [Aliase.CATEGORIES];

    if (needComments) {
      include.push(Aliase.COMMENTS);
    }

    const offers = await this._Offer.findAll({include});

    return offers.map((offer) => offer.get());
  }

  async findOne(id) {

    const offer = await this._Offer.findByPk(id, {
      include: [
        Aliase.CATEGORIES,
        {
          model: this._Comment,
          as: Aliase.COMMENTS,
          separate: true,
        }
      ]
    });
    return offer;
  }

  async upDate(id, offer) {
    const [affectedRows] = await this._Offer.update(offer, {
      where: {id}
    });

    return !!affectedRows;
  }

}

module.exports = OfferService;
