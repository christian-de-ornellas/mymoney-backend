const mongoose = require("../database");

const PaymentSchema = new mongoose.Schema({
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

	categorie: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Categorie",
		require: true
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		require: true
	}
});

const Payment = mongoose.model("Payment", PaymentSchema)
module.exports = Payment
