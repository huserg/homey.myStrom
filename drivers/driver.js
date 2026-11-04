'use strict';

const Homey = require('homey');
const withLogging = require('../lib/withLogging');

module.exports = class BaseDriver extends withLogging(Homey.Driver) {

  onInit() {
    super.onInit();
  }

};
