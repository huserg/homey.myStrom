'use strict';

const Homey = require('homey');
const withLogging = require('./withLogging');

const REQUEST_TIMEOUT = 10 * 1000;

/**
 * Device reached over HTTP at `getBaseURL()`. Any failed request marks the
 * device unavailable, the next successful one marks it available again.
 */
module.exports = class HttpDevice extends withLogging(Homey.Device) {

  get data() {
    return this.getData();
  }

  onInit() {
    this.initDevice();
  }

  initDevice() {
    return this.getDeviceValues();
  }

  getDeviceValues(path) {
    return this.getDeviceData(path);
  }

  getDeviceData(path) {
    return this.#request(path);
  }

  setDeviceData(path, body) {
    return this.#request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
  }

  deviceChanged(getMessage) {
    this.logInfo(getMessage());
  }

  async #request(path, options = {}) {
    try {
      const res = await fetch(`${this.getBaseURL()}${path}`, {
        ...options,
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} on ${path}`);
      if (!this.getAvailable()) await this.setAvailable();
      // Some devices announce JSON but send an empty body on writes.
      const text = await res.text();
      const isJson = (res.headers.get('content-type') || '').includes('json');
      return isJson && text ? JSON.parse(text) : text;
    } catch (err) {
      await this.setUnavailable(err.message).catch(() => {});
      throw err;
    }
  }

};
