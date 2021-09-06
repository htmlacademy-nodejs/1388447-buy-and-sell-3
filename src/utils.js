'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i >= 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const extend = (...rest) => {
  const objects = rest.filter((object) => typeof object === `object`);
  return Object.assign({}, ...objects);
};

const ensureArray = (value) => Array.isArray(value) ? value : [value];

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1
        )
    );
  }

  return result;
};

module.exports = {getRandomInt, shuffle, extend, ensureArray, getRandomSubarray};
