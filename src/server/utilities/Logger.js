/* eslint-disable no-console */
import chalk from 'chalk';

function log(...parameters) {
  console.log(chalk.white.bgGreen('[LOG]'), ...parameters);
}

function info(...parameters) {
  console.log(chalk.white.bgCyan('[INFO]'), ...parameters);
}

function debug(...parameters) {
  console.log(chalk.white.bgBlue('[DEBUG]'), ...parameters);
}

function warn(...parameters) {
  console.log(chalk.blue.bgYellow('[WARN]'), ...parameters);
}

function error(...parameters) {
  console.log(chalk.white.bgRed('[ERROR]'), ...parameters);
}

function json(object, indentation = 2) {
  console.log(JSON.stringify(object, null, indentation));
}

export default {
  log,
  info,
  debug,
  warn,
  error,
  json,
};
