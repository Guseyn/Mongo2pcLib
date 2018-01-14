'use strict'

const PreparedTransaction = require('./preparedTransaction');

class Transaction 

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

    //API alias
    invoke() 
      {
        this.prepare();
      }

    prepare() 
      {
        
        this.transactionCollection.systemJS(
          (error, systemJSCollection) => {

            if (error == null) {

              this.transactionOperations
                .saveFunctionalArgumentsIntoSystemJS(
                  systemJSCollection,
                    this.id, this.rollbackId,
                      () => {
                        new PreparedTransaction(
                          this.id, this.rollbackId,
                          this.transactionCollection,
                          this.transactionOperations,
                          this.transactionCallbacks
                        ).invoke();
                      }
                );

            } else {

              // Main transaction
              if (rollbackId != null) {
                this.transactionCallbacks.nonConsistentFail(
                  new Error(
                    `systemJS error is not accessable: ${error.message}`
                  ), this.id
                );
              } else {
                // Rollback transcation
                this.transactionCallbacks.consistentFail(
                  new Error(
                    `systemJS error is not accessable: ${error.message}`
                  ), this.id
                );
              }

            }

          }
        );

      }



}


module.exports = Transaction;
