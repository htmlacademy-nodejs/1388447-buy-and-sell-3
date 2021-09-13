'use strict';

const express = require(`express`);
const request = require(`supertest`);
const search = require(`./search`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);

const mockCategories = [
  `Книги`,
  `Цветы`,
  `Животные`,
  `Разное`
];

const mockOffers = [
  {
    "categories": [
      `Животные`,
      `Разное`
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
  }
];

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, offers: mockOffers});
  search(app, new DataService(mockDB));
});

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({query: `Продам`});
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`1 offer found`, () => expect(response.body.length).toBe(1));

  test(`Offer has correct title`, () => expect(response.body[0].title).toBe(`Продам отличную подборку фильмов на VHS.`));

});

describe(`API returns offer based on search query`, () => {

  test(`API return code 404 if nothing is found`, () => {
    return request(app)
      .get(`/search`)
      .query({query: `абвгдейка обыкновенная`})
      .expect(HttpCode.NOT_FOUND);
  });

  test(`API returns 400 when query string is absent`, () => {
    return request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST);
  });
});
