const express = require("express");

const authMiddleware = require("../middlewares/auth");

const Payment = require("../models/Payment");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", async (req, res) => {
	try {
		const payment = await Payment.create({ ...req.body, user: req.userId });
		return res.status(201).send({ payment });
	} catch (error) {
		return res.status(400).send({ error: "Not created a  payment!" });
	}
});
router.get("/list", async (req, res) => {
	try {
		const payment = await Payment.find()
			.sort({ date: -1 })
			.populate("user")
			.populate("categorie")
		return res.status(200).send({ payment });
	} catch (error) {
		return res.status(400).send({ error: "No results!" });
	}
});

router.get("/detail/:paymentId", async (req, res) => {
	try {
		const payment = await Payment.findOne({_id: req.params.paymentId})
			.populate("user")
			.populate("categorie")
		return res.status(200).send({ payment });
	} catch (error) {
		return res.status(400).send({ error: "No results!" });
	}
});

router.put("/edit/:paymentId", async (req, res) => {
	try {
		const payment = await Payment.findByIdAndUpdate(
			req.params.paymentId,
			{
				...req.body,
				user: req.userId
			},
			{ new: true }
		);

		await payment.save();

		return res.status(201).send({ payment });
	} catch (err) {
		return res.status(400).send({ error: "Error updating!" });
	}
});

router.delete("/remove/:paymentId", async (req, res) => {
	try {
		await Payment.findByIdAndRemove(req.params.paymentId);
		return res.status(200).send();
	} catch (error) {
		return res.status(400).send({ error: "Error deleting Payment!" });
	}
});

module.exports = app => app.use("/payment", router);
