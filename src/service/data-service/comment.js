'use strict';

const {nanoid} = require(`nanoid`);
const {extend} = require(`../../utils`);
const {MAX_LENGTH_ID} = require(`../../constants`);

class Comment {

  findAll(offer) {
    return offer.comments;
  }

  findOne(id, offer) {
    const comment = offer.comments.find((item) => item.id === id);

    if (!comment) {
      return null;
    }
    return comment;
  }

  create(comment, offer) {
    const newComment = extend({id: nanoid(MAX_LENGTH_ID)}, comment);
    offer.comments.push(newComment);

    return newComment;
  }

  remove(id, offer) {
    const comment = offer.comments.filter((item) => item.id === id);

    if (!comment) {
      return null;
    }

    offer.comments = offer.comments.filter((item) => item.id !== id);

    return comment;
  }
}

module.exports = Comment;
