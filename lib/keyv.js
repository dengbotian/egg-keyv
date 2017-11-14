'use strict';

const assert = require('assert');
const Keyv = require('keyv');

function checkKeyvConfig(config) {
  assert(config.redis,
    '[egg-keyv] Must set `redis` in keyv\'s config');
}

module.exports = app => {
  app.addSingleton('keyv', (config, app) => {
    checkKeyvConfig(config)
    return new Keyv(config.redis, { namespace: config.namespace });
  });
  app.createKeyv = app.keyv.createInstance.bind(app.keyv);
};