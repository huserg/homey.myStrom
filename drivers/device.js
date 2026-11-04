'use strict';

const HttpDevice = require('../lib/HttpDevice');

module.exports = class BaseDevice extends HttpDevice {

  #refreshDeviceInterval = null;

  onInit() {
    super.onInit();

    this.homey.on(`deviceGenAction-${this.data.mac}`, async (params) => {
      this.deviceGenActionReceived(params);
    });
  }

  // initDevice() {
  //   return super.initDevice()
  // }

  initDeviceRefresh() {
    this.logDebug('initDeviceRefresh()');
    this.#refreshDeviceInterval = this.homey.setInterval(() => {
      this.logDebug('deviceRefresh()');
      this.getDeviceValues();
    }, 1 * 60 * 1000); // set interval to every 1 minutes.
  }

  // Homey Lifecycle

  onDeleted() {
    super.onDeleted();

    if (this.#refreshDeviceInterval !== null) {
      this.homey.clearInterval(this.#refreshDeviceInterval);
    }
  }

  onUnload() {
    super.onUnload();

    if (this.#refreshDeviceInterval !== null) {
      this.homey.clearInterval(this.#refreshDeviceInterval);
    }
  }

  // HttpDevice

  getBaseURL() {
    return `http://${this.getStoreValue('address')}/api/v1/`;
  }

  // myStromDevice action

  deviceGenActionReceived(params) {
    this.logDebug(`deviceGenActionReceived() > ${JSON.stringify(params)}`);
  }

};
