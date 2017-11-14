'use strict';

const assert = require('assert');
const Keyv = require('keyv');

function checkKeyvConfig(config) {
  assert(config.redis,
    '[egg-keyv] Must set `redis` in keyv\'s config');
}

module.exports = app => {
  app.addSingleton('keyv', (config, app) => {
    const keyv = new Keyv(config.redis, { namespace: config.namespace }); 
    keyv.on('error', err => console.log('Connection Error', err));
    return keyv
  });
  app.createKeyv = app.keyv.createInstance.bind(app.keyv);
};