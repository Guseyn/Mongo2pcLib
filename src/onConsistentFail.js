'use strict'

class OnConsistentFail 

  {

    constructor (callback)
      {
        this.callback = callback;
      }

    call(error, transactionId)
     {
      this.callback(error, transactionId);
     }

  }

module.exports = OnConsistentFail;
