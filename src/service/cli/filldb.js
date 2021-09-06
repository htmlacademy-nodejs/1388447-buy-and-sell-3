"use strict";

const fs = require(`fs/promises`);
const {getRandomInt, shuffle, getRandomSubarray} = require(`../../utils`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const Aliese = require(`../models/aliase`);
const {getLogger} = require(`../lib/logger`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_SENTENCES_PATH = `./src/data/sentences.txt`;
const FILE_TITLES_PATH = `./src/data/titles.txt`;
const FILE_CATEGORIES_PATH = `./src/data/categories.txt`;
const FILE_COMMENTS_PATH = `./src/data/comments.txt`;

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

const logger = getLogger({name: `filldb`});

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    logger.error(`An error occurred: ${err.message}. Stack: ${err.stack})`);
    return [];
  }
};

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const generateComments = (count, comments) => {
  return Array(count).fill({}).map(() => ({
    text: shuffle(comments)
      .slice(0, getRandomInt(1, comments.length - 1))
      .join(` `),
  }));

};

const generateOffers = (countOffer, titles, categories, sentences, comments) => {
  return Array(countOffer).fill({}).map(() => ({
    category: getRandomSubarray(categories),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    comments: generateComments(getRandomInt(0, comments.length - 1), comments),
  }));
};

module.exports = {
  name: `--filldb`,
  async run(args) {

    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
      const {Category, Offer} = defineModels(sequelize);
      await sequelize.sync({force: true});

      const sentences = await readContent(FILE_SENTENCES_PATH);
      const titles = await readContent(FILE_TITLES_PATH);
      const categories = await readContent(FILE_CATEGORIES_PATH);
      const comments = await readContent(FILE_COMMENTS_PATH);
      const categoryModels = await Category.bulkCreate(
          categories.map((item) => ({name: item}))
      );

      const [count] = args;
      const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
      if (countOffer > MAX_COUNT) {
        throw Error(`Не больше ${MAX_COUNT} объявлений`);
      }

      const offers = generateOffers(countOffer, titles, categoryModels, sentences, comments);
      const offerPromises = offers.map(async (offer) => {
        const offerModel = await Offer.create(offer, {include: [Aliese.COMMENTS]});
        await offerModel.addCategories(offer.categories);
      });

      await Promise.all(offerPromises);

    } catch (err) {
      logger.error(`An error occurred: ${err.message}. Stack: ${err.stack})`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);
  }
};
