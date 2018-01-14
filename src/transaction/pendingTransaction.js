
const AppliedTransaction = require('./appliedTransaction');
const CanceledTransaction = require('./canceledTransaction');

class PendingTransaction 

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

    upgrade (results)
      {

        results = results || [];

        this.transactionOperations.executeCurrent(
          results,
            (error, result) => {

              if (error == null) {

                results.push(result);

                if (this.transactionOperations.isLast()) {

                  this.transactionCollection.apply(
                    this.id,
                      result,
                        this.transactionOperations.currentNum(),
                          (error, result) => {

                            if (error == null) {

                              new AppliedTransaction(
                                this.id,
                                this.rollbackId,
                                this.transactionCollection,
                                this.transactionOperations.next(),
                                this.transactionCallbacks
                              ).finish(results);

                            } else {

                              cancel('applying transaction');

                            }

                          }
                  );

                } else {

                  this.transactionCollection.upgrade(
                    this.id,
                      result,
                        this.transactionOperations.currentNum(),
                          (error, result) => {
                          
                            if (error == null) {
                            
                              new PendingTransaction(
                                this.id,
                                this.rollbackId,
                                this.transactionCollection,
                                this.transactionOperations.next(),
                                this.transactionCallbacks
                              ).upgrade(results);

                            } else {
                              cancel(
                                `upgrading transaction failed on operation with number ${this.transactionOperations.currentNum()}`
                              );
                            }
                          }
                  );

                }
              } else {

                cancel(`executing of the operation with number ${this.transactionOperations.currentNum()}`)
              
              }

            });
      }

    cancel(specificCancelMessage) 
      {
        if (this.rollbackId != null) {

          this.transactionCollection.cancel(
            this.id,
              this.transactionOperations.currentNum(),
                (error, result) => {

                  if (error == null) {
                    
                    new CanceledTransaction(
                      this.id,
                      this.rollbackId,
                      this.transactionCollection,
                      this.transactionOperations,
                      this.transactionCallbacks
                    ).rollback();

                  } else {

                    this.transactionCallbacks.consistentFail(
                        new Error(
                          `${specificCancelMessage} failed with error: ${error.mesasge}`
                        ), this.id
                    );

                  }

                }
          );

        }
      }

  }

module.exports = PendingTransaction;
