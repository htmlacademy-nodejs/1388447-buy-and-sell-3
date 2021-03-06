'use strict';

const version = require(`./version`);
const help = require(`./help`);
// const generate = require(`./generate`);
const server = require(`./server`);
const fill = require(`./fill`);
const filldb = require(`./filldb`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  // [generate.name]: generate,
  [server.name]: server,
  [filldb.name]: filldb,
  [fill.name]: fill,
};

module.exports = {
  Cli,
};
