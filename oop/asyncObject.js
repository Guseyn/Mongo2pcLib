class AsyncObject {

	constructor(asyncFunc, ...args) {
		this.asyncFunc = asyncFunc;
		this.args = args;
	}

	call(thisObj) {
		this.args.push((error, result) => {
			if (error) {
				this.onError(error);
			} else {
				this.onResult(result);
			}
		});
		this.asyncFunc.apply(thisObj, this.args);
	}

	onError(error) {

	}

	onResult(result) {

	}

}

module.exports = AsyncObject;
