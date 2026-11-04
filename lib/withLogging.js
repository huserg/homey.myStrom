'use strict';

module.exports = (Base) => class extends Base {

  logDebug(msg) {
    this.log('[debug]', msg);
  }

  logInfo(msg) {
    this.log('[info]', msg);
  }

  logNotice(msg) {
    this.log('[notice]', msg);
  }

  logError(msg) {
    this.error('[error]', msg);
  }

};
