'use strict'

class FailedTransaction 

  {

    constructor (
      transactionEnvironment,
        transactionOperations,
          transactionCallbacks
    )
      {
        this.transactionEnvironment = transactionEnvironment;
        this.transactionOperations = transactionOperations;
        this.transactionCallbacks = transactionCallbacks;
      }

    out() 
      {
    
      }

  }

module.exports = FailedTransaction;
