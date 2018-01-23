class AsyncObject {

	constructor(encapsulatedProperties) {
		Object.keys(encapsulatedProperties).forEach(function(key, index) {
			if (index === 0) this.objName = key;
			this[key] = encapsulatedProperties[key];
		}.bind(this));
	}

	call(asyncCall, ...args) {
		this[this.objName][asyncCall](...args, (error, result) => {
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
