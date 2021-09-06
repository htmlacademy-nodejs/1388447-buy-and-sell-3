"use strict";

const {DataTypes, Model} = require(`sequelize`);


class Offer extends Model {
}

const define = (sequelize) => Offer.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  picture: DataTypes.STRING,
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sum: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  modelName: `Offer`,
  tableName: `offers`
});

module.exports = define;
