class TransactionCallbacks {

  constructor (onCommit, onRollback, onConsistentFail, onNonConsistentFail) {
    this.onCommit = onCommit;
    this.onRollback = onRollback;
    this.onConsistentFail = onConsistentFail;
    this.onNonConsistentFail = onNonConsistentFail;
  }

  commit (id, results) {
    this.onCommit.call(id, results || []);
  }

  rollback (id, results) {
    this.onRollback.call(id, results || []);
  }

  consistentFail(error, id) {
    this.onConsistentFail.call(error, id);
  }

  nonConsistentFail(error, id) {
    this.onNonConsistentFail.call(error, id);
  }

}

module.exports = TransactionCallbacks;
