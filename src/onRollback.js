'use strict'

class OnRollback 

  {

    constructor (callback)
      {
        this.callback = callback;
      }

    call (error, results)
      {
        this.callback(error, results);
      }

  }

module.exports = OnRollback;
