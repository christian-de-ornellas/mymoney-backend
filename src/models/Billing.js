const mongoose = require("../database");

const BillingSchema = new mongoose.Schema({
	origem: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},

	description: {
		type: String,
		required: true
	},

    date: {
        type: Date, default: Date.now
	},
	
	value: {
		type: String,
		required: true
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		require: true
	}
});

const Billing = mongoose.model("Billing", BillingSchema)
module.exports = Billing
