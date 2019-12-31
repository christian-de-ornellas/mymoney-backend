const mongoose = require("../database");

const bcrypt = require("bcryptjs");

const CategorieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		require: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Categorie = mongoose.model("Categorie", CategorieSchema);
module.exports = Categorie;
