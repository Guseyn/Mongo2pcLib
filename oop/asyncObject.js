class AsyncObject {

	constructor(obj, encapsulatedProperties) {
		this.obj = obj;
		Object.keys(encapsulatedProperties).forEach(function(key) {
			this[key] = encapsulatedProperties[key];
		}.bind(this));
	}

	call(asyncCall, ...args) {
		this.obj[asyncCall](...args, (error, result) => {
			if (error != null) {
				this.onError(error);
			} else {
				this.onResult(result);
			}
		});
	}

	onResult(result) {

	}

	onError(error) {

	}

}

module.exports = AsyncObject;
