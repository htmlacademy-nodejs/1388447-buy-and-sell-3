'use strict';

const path = require(`path`);
const pino = require(`pino`);
const {Env, LOG_FILE} = require(`../../constants`);

const isDevMode = process.env.NODE_ENV !== Env.PRODUCTION;
const defaultLogLevel = isDevMode ? `debug` : `info`;

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: isDevMode,
}, isDevMode ? process.env.stdout : pino.destination(path.resolve(process.cwd(), LOG_FILE)));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
