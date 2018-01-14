'use strict'

class OnRollback 

  {

    constructor (callback)
      {
        this.callback = callback;
      }

    call (transactionId, results)
      {
        this.callback(transactionId, results);
      }

  }

module.exports = OnRollback;
