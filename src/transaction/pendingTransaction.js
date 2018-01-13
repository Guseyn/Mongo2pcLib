
const AppliedTransaction = require('./appliedTransaction');

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

                              console.log('apply pending transactionCollection error');
                              console.log(error);
                              // cancel transaction
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
                            
                              console.log('upgrade pending transactionCollection error');
                              console.log(error);
                              // cancel transaction
                            }
                          }
                  );

                }
              } else {

                console.log('upgrade pending transaction error');
                console.log(error);
                // cancel transaction
              
              }
            });
      }

    cancel() 
      {
        
      }

  }

module.exports = PendingTransaction;
