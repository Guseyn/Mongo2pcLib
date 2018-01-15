'use strict'

class OnNonConsistentFail {

  constructor (callback) {
    this.callback = callback;
  }

  call (error, transactionId) {
    this.callback(error, transactionId);
  }

}

module.exports = OnNonConsistentFail;
