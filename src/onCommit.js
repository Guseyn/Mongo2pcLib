'use strict'

class OnCommit 

  {

    constructor (callback)
      {
        this.callback = callback;
      }

    call(results)
     {
      this.callback(results);
     }

  }

module.exports = OnCommit;
