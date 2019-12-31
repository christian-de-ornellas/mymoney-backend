const express = require("express");

const authMiddleware = require("../middlewares/auth");

const Categorie = require("../models/Categorie");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", async (req, res) => {

    try {

        const categorie = await Categorie.create({ ...req.body, user: req.userId })
        return res.status(201).send({categorie})

    } catch (error) {
        console.log("error >>", error)
        return res.status(400).send({error: "Error at creating new categorie!"})
    }
});



module.exports = app => app.use('/categorie', router)
