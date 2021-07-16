'use strict';

const express = require(`express`);
const request = require(`supertest`);
const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": "v2O83t",
    "category": [
      "Животные",
      "Книги",
      "Журналы"
    ],
    "description": "Даю недельную гарантию. Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города. Продаю с болью в сердце...",
    "picture": "item07.jpg",
    "title": "Продам отличную подборку фильмов на VHS.",
    "type": "OFFER",
    "sum": 43399,
    "comments": [
      {
        "id": "eHLMYT",
        "text": "С чем связана продажа? Почему так дешёво? Неплохо но дорого Совсем немного... Вы что?! В магазине дешевле."
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({query: `Продам`});
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`1 offer found`, () => expect(response.body).toEqual(mockData[0]));

  test(`Offer has correct id`, () => expect(response.body.id).toBe(`v2O83t`));

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
