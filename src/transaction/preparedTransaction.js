
'use strict'

const InvokedTransaction = require('./invokedTransaction');

class PreparedTransaction 

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

  invoke() 
    {

      if (this.transactionOperations.isEmpty()) {
        
        this.transactionCallbacks.commit();
      
      } else {

        let initialTransactionLog = this.transactionCollection
          .initialTransactionLog (
            this.id,
            this.rollbackId,
              this.transactionOperations
          );

          this.transactionCollection.init(
              initialTransactionLog,
                (error, result) => {

                  if (error == null) {

                    new InvokedTransaction(
                      this.id,
                      this.rollbackId,
                      this.transactionCollection,
                      this.transactionOperations,
                      this.transactionCallbacks
                    ).start();
                
                  } else {

                    // Main transaction
                    if (rollbackId != null) {
                      this.transactionCallbacks.nonConsistentFail(
                        new Error(
                          `transaction init error: ${error.message}`
                        ), this.id
                      );
                    } else {
                      // Rollback transaction
                      this.transactionCallbacks.consistentFail(
                        new Error(
                          `transaction init error: ${error.message}`
                        ), this.id
                      );
                    }
                    
                  }
                }
          );
      }
    }

  }


module.exports = PreparedTransaction;
