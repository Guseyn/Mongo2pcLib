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
        this.transactionCallbacks.nonConsistentFail(
          new Error(
            `error: transaction failed, but consstency of the db is not broken`
          ), this.id
        );
      }

  }

module.exports = FailedTransaction;
