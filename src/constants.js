'use strict';

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const USER_ARGV_INDEX = 2;
const MOCKS_FILE_PATH = `mocks.json`;
const DEFAULT_COMMAND = `--help`;
const DEFAULT_PORT = 3000;
const MAX_LENGTH_ID = 6;
const API_PREFIX = `/api`;

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const Route = {
  MAIN: `/`,
};

module.exports = {
  ExitCode,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  HttpCode,
  DEFAULT_PORT,
  MOCKS_FILE_PATH,
  Route,
  MAX_LENGTH_ID,
  API_PREFIX,
};
