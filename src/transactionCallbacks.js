class TransactionCallbacks 

  {

    constructor (onCommit, onRollback, onConsitentFail, onNonConsitentFail) 
      {
        this.onCommit = onCommit;
        this.onRollback = onRollback;
        this.onConsitentFail = onConsitentFail;
        this.onNonConsitentFail = onNonConsitentFail;
      }

    commit (id, results)
      {
        this.onCommit.call(id, results || []);
      }

    rollback (id, results)
      {
        this.onRollback.call(id, results || []);
      }

    consitentFail(error, id)
      {
        this.onConsitentFail.call(error, id);
      }

    nonConsitentFail(error, id) {
      this.onNonConsitentFail(error, id);
    }

  }

module.exports = TransactionCallbacks;
