'use strict';

const express = require(`express`);
const request = require(`supertest`);
const DataService = require(`../data-service/category`);
const category = require(`./category`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `v2O83t`,
    "category": [
      `Животные`,
      `Книги`,
      `Журналы`
    ],
    "description": `Даю недельную гарантию. Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города. Продаю с болью в сердце...`,
    "picture": `item07.jpg`,
    "title": `Продам отличную подборку фильмов на VHS.`,
    "type": `OFFER`,
    "sum": 43399,
    "comments": [
      {
        "id": `eHLMYT`,
        "text": `С чем связана продажа? Почему так дешёво? Неплохо но дорого Совсем немного... Вы что?! В магазине дешевле.`
      }
    ]
  }
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 categories`, () => expect(response.body.length).toBe(3));

  test(`Category names are 'Животные', 'Книги', 'Журналы'`, () => {
    return expect(response.body).toEqual(expect.arrayContaining([
      `Животные`,
      `Книги`,
      `Журналы`,
    ]));
  });
});
