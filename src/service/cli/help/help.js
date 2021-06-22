'use strict';

const {name: version} = require('../version/version');
const {name: generate} = require('../generate/generate');
const chalk = require('chalk');

module.exports = {
  name: `--help`,
  run() {
    console.log(chalk.grey(`
    Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>
    Команды:
    ${version}:            выводит номер версии
    ${this.name}:               печатает этот текст
    ${generate}: <count>   формирует файл mocks.json

    `
    ));
  }
}
