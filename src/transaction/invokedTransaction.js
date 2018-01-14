
const PendingTransaction = require('./pendingTransaction');
const FailedTransaction = require('./failedTransaction');

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

                if (rollbackId != null) {
                  
                  this.transactionCollection.fail(this.id, (error, result) => {

                    if (error == null) {

                      new FailedTransaction(
                        this.id,
                        this.rollbackId,
                        this.transactionCollection,
                        this.transactionOperations,
                        this.transactionCallbacks
                      ).out();

                    } else {

                      this.transactionCallbacks.nonConsistentFail(
                        new Error(
                          `faled on changing state of the transaction to fail state with error: ${error.message}`
                        ), this.id
                      );

                    }

                  });

                } else {

                  this.transactionCallbacks.сonsistentFail(
                    new Error(
                      `faled on changing state of the transaction to fail state with error: ${error.message}`
                    ), this.id
                  );

                }

              }
            }
        );
      }

  }

module.exports = InvokedTransaction;
