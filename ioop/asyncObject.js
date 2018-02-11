class AsyncObject {

  constructor(encapsulatedProperties, asyncObject) {
    if (encapsulatedProperties) {
      Object.keys(encapsulatedProperties).forEach(function(key, index) {
        this[key] = encapsulatedProperties[key];
      }.bind(this));
    }
    this.asyncObject = asyncObject;
  }

  call(module, asyncCall, ...asyncCallArgs) {
    module[asyncCall](...asyncCallArgs, (error, result) => {
      if (error != null) {
        this.onFail(error);
      } else if (this.asyncObject instanceof AsyncObject) {
        this.asyncObject.call(result);
      }
    });
  }

  onFail(error) {
    // handle error here
  }

}

module.exports = AsyncObject;
