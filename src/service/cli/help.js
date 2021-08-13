'use strict';

const {name: version} = require(`./version`);
const {name: generate} = require(`./generate`);
const {name: server} = require(`./server`);
const {name: fill} = require(`./fill`);
const chalk = require(`chalk`);

module.exports = {
  name: `--help`,
  run() {
    console.log(chalk.grey(`
    Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>
    Команды:
    ${version}:            выводит номер версии
    ${this.name}:          печатает этот текст
    ${generate}: <count>   формирует файл mocks.json
    ${server}: <count>     запустит сервер
    ${fill}: <count>       формирует файл fill-db.sql

    `
    ));
  }
};
