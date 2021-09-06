"use strict";

const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineOffer = require(`./offer`);
const Aliase = require(`./aliase`);
const {Model} = require(`sequelize`);


const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);

  Offer.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `offerId`});
  Comment.belongsTo(Offer, {foreignKey: `offerId`});

  class OfferCategories extends Model {
  }

  OfferCategories.init({}, {sequelize});

  Offer.belongsToMany(Category, {through: OfferCategories, as: Aliase.CATEGORIES});
  Category.belongsToMany(Offer, {through: OfferCategories, as: Aliase.OFFERS});
  Category.hasMany(OfferCategories, {as: Aliase.OFFER_CATEGORIES});

  return {Category, Comment, Offer, OfferCategories};
};

module.exports = define;
