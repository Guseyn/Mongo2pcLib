'use strict'

class FailedTransaction 

  {

    constructor (
      id,
      rollbackId,
        transactionCollection,
          transactionOperations,
            transactionCallbacks
    )
      {
        this.id = id;
        this.rollbackId = rollbackId;
        this.transactionCollection = transactionCollection;
        this.transactionOperations = transactionOperations;
        this.transactionCallbacks = transactionCallbacks;
      }

    out() 
      {
    
      }

  }

module.exports = FailedTransaction;
