'use strict';

const fs = require(`fs/promises`);
const {getRandomInt, shuffle} = require(`../../../utils`);
const {ExitCode} = require('../../../constants');

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = './src/data/sentences.txt';
const FILE_TITLES_PATH = `./src/data/titles.txt`;
const FILE_CATEGORIES_PATH = `./src/data/categories.txt`;
const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};
const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};
const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const generateOffers = (countOffer, titles, categories, sentences) => {
  return Array(countOffer).fill({}).map(() => ({
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    try {
      if(countOffer >= MAX_COUNT) {
        throw Error(`Не больше 1000 объявлений`);
      }
      const sentences = await readContent(FILE_SENTENCES_PATH);
      const titles = await readContent(FILE_TITLES_PATH);
      const categories = await readContent(FILE_CATEGORIES_PATH);

      const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

      await fs.writeFile(FILE_NAME, content);
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.log(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
