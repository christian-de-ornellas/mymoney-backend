const express = require("express");

const authMiddleware = require("../middlewares/auth");

const Billing = require("../models/Billing");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", async (req, res) => {
	try {
		const billing = await Billing.create({ ...req.body, user: req.userId });
		return res.status(201).send({ billing });
	} catch (error) {
		return res.status(400).send({ error: "Not created a  billing!" });
	}
});

router.get("/list", async (req, res) => {
	try {
		const billing = await Billing.find().sort({ date: -1 });
		return res.status(200).send({ billing });
	} catch (error) {
		return res.status(400).send({ error: "No results!" });
	}
});

router.put("/edit/:billingId", async (req, res) => {
	try {
		const billing = await Billing.findByIdAndUpdate(
			req.params.billingId,
			{
				...req.body,
				user: req.userId
			},
			{ new: true }
		); // o new true é para o moongose retornar os valores atuais atualizados pois por padrao ele retorna os valores antigos.

		await billing.save();

		return res.status(201).send({ billing });
	} catch (err) {
		console.log(error);
		return res.status(400).send({ error: "Error updating!" });
	}
});

router.delete("/remove/:billingId", async (req, res) => {
	try {
		await Billing.findByIdAndRemove(req.params.billingId);
		return res.status(200).send();
	} catch (error) {
		return res.status(400).send({ error: "Error deleting billing!" });
	}
});

module.exports = app => app.use("/billing", router);
