'use strict'

class CanceledTransaction 

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

    rollback() 
      {
    
      }

  }

module.exports = CanceledTransaction;
