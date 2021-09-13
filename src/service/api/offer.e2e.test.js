'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
const offer = require(`./offer`);
const OfferService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);


const mockCategories = [
  `Животные`,
  `Посуда`,
  `Марки`,
  `Разное`,
  `Книги`
];

const mockOffers = [
  {
    "categories": [
      `Животные`,
      `Посуда`,
    ],
    "description": `Даю недельную гарантию. Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города. Продаю с болью в сердце...`,
    "picture": `item07.jpg`,
    "title": `Продам отличную подборку фильмов на VHS.`,
    "type": `OFFER`,
    "sum": 43399,
    "comments": [
      {
        "text": `С чем связана продажа? Почему так дешёво? Неплохо но дорого Совсем немного... Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "categories": [
      `Книги`
    ],
    "description": `Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города.`,
    "picture": `item07.jpg`,
    "title": `Продам подборку фильмов.`,
    "type": `OFFER`,
    "sum": 13309,
    "comments": [
      {
        "text": `Почему так дешёво? В магазине дешевле.`
      }
    ]
  }
];

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories: mockCategories, offers: mockOffers});
  const app = express();
  app.use(express.json());
  offer(app, new OfferService(mockDB), new CommentService(mockDB));
  return app;
};

describe(`API returns a list of all offers`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 2 offers`, () => expect(response.body.length).toBe(2));

  test(`First offer's title equals "Продам отличную подборку фильмов на VHS."`, () => expect(response.body[0].title).toBe(`Продам отличную подборку фильмов на VHS.`));

});

describe(`API creates an offer if data is valid`, () => {
  const newOffer = {
    categories: [1, 2],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Offers count is changed`, () => {
    return request(app)
      .get(`/offers`)
      .expect((res) => expect(res.body.length).toBe(3));
  });

});

describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent offer`, () => {

  const newOffer = {
    categories: [2],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`/offers/1`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/1`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

test(`API returns status code 404 when trying to change non-existent offer`, async () => {
  const app = await createAPI();

  const validOffer = {
    categories: [3],
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, async () => {

  const app = await createAPI();

  const invalidOffer = {
    categories: [1, 2],
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/offers/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer count is 1 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(1))
  );

});

test(`API refuses to delete non-existent offer`, async () => {
  const app = await createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API refuses to create of delete comment`, () => {
  test(`API refuses to create a comment to non-existent offer and returns status code 404`, async () => {

    const app = await createAPI();

    return request(app)
      .post(`/offers/NOEXST/comments`)
      .send({
        text: `Неважно`
      })
      .expect(HttpCode.NOT_FOUND);

  });

  test(`API refuses to delete non-existent comment`, async () => {

    const app = await createAPI();

    return request(app)
      .delete(`/offers/1/comments/NOEXST`)
      .expect(HttpCode.NOT_FOUND);

  });
});
