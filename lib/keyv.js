'use strict';

const assert = require('assert');
const Keyv = require('keyv');
let count = 0;
module.exports = app => {
  app.addSingleton('keyv', (config, app) => {
    const keyv = new Keyv(config !== undefined ? config.url : undefined, config);
    keyv.on('error', err => app.coreLogger.error('Connection Error', err));

    app.beforeStart(() => {
      const index = count++;
      app.coreLogger.info(`[egg-keyv] instance[${index}] status OK`);
    });
    return keyv
  });
};