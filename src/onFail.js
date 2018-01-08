'use strict'

class OnFail 

	{

		constructor (callback)
			{
				this.callback = callback;
			}

		call(error, transactionId)
		 {
		 	this.callback(error, transactionId);
		 }

	}

module.exports = OnFail;
