
const PendingTransaction = require('./pendingTransaction');

class InvokedTransaction 

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

    start() 
      {
        this.transactionCollection.start(
          this.id,
            (error, result) => {

              if (error == null) {
              
                new PendingTransaction(
                  this.id,
                  this.rollbackId,
                  this.transactionCollection,
                  this.transactionOperations,
                  this.transactionCallbacks
                ).upgrade();

              } else {

                throw new Error(
                  `error: failed on start transaction in the system: ${error}`
                );

              }
            }
        );
      }

  }

module.exports = InvokedTransaction;
