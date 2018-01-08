class TransactionCallbacks 

  {

    constructor (onCommit, onRollback, onFail) 
      {
        this.onCommit = onCommit;
        this.onRollback = onRollback;
        this.onFail = onFail;
      }

    commit (results)
      {
        this.onCommit.call(results || []);
      }

    rollback (error, results)
      {
        this.onRollback.call(error, results || []);
      }

    fail(error, transactionId)
      {
        this.onFail.call(error, transactionId);
      }

  }

module.exports = TransactionCallbacks;
