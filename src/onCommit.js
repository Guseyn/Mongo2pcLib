'use strict'

class OnCommit {

  constructor (callback) {
    this.callback = callback;
  }

  call(transactionId, results) {
    this.callback(transactionId, results);
  }

}

module.exports = OnCommit;
