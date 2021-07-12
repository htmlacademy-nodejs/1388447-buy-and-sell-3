'use strict';

class Search {
  constructor(offers) {
    this._offers = offers;
  }

  findOffer(query) {
    const resultByCategories = this.findByCategory(query);
    const resultByDescription = this.findByDescription(query);
    const resultByTitle = this.findByTitle(query);

    return resultByCategories || resultByDescription || resultByTitle;
  }

  findByCategory(query) {
    const offer = this._offers.find((offer) => offer.category.find((category) => category.includes(query)));
    if (!offer) {
      return null;
    }
    return offer;
  }

  findByDescription(query) {
    const offer = this._offers.find((offer) => offer.description.includes(query));
    if(!offer) {
      return null;
    }
    return offer;
  }

  findByTitle(query) {
    const offer = this._offers.find((offer) => offer.title.includes(query));
    if(!offer) {
      return null;
    }
    return offer;
  }
}

module.exports = Search;
