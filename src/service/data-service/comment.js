'use strict';

class CommentService {
  constructor(sequelize) {
    // this._Offer = sequelize.models.Offer;
    this._Comment = sequelize.models.Comment;
  }

  async findAll(offerId) {
    return await this._Comment.findAll({
      where: {offerId},
      raw: true
    });
  }

  async findOne(offerId) {
    return await this._Comment.findOne({
      where: {offerId},
      raw: true
    });
  }

  async create(offerId, comment) {
    return this._Comment.create({
      offerId,
      ...comment
    });
  }

  async remove(id) {
    const removedRows = await this._Comment.destroy({
      where: {id}
    });

    return !!removedRows;
  }
}

module.exports = CommentService;
