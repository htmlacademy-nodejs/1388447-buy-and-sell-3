'use strict';

const fs = require(`fs/promises`);
const {MOCKS_FILE_PATH} = require(`../../constants`);

let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const content = await fs.readFile(MOCKS_FILE_PATH);
    data = JSON.parse(content);

  } catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports.getMockData = getMockData;
