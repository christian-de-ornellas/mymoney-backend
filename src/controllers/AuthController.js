const express = require('express')
    // criptografia
const bcrypt = require('bcryptjs')
    //Gerador de token
const jwt = require('jsonwebtoken')

//Model
const User = require('../models/User')

// instancia o obj rota
const router = express.Router()

//Importa o secret
const authConfig = require('../config/auth')

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

// rota para criar o usuário
router.post('/register', async(req, res) => {

    // pego o email antes para depois tratar
    const { email } = req.body

    try {
        // valida se o email já existe
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists!' })
        }

        const user = await User.create(req.body)

        //Não mostra o password apos a criação do login
        user.password = undefined

        // return res.status(201).send({ user })
        res.send({ user, token: generateToken({ id: user.id }) })

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
})

// rota de autenticação
router.post('/authenticate', async(req, res) => {

    //receberá da requisição.
    const { email, password } = req.body

    // O select é para não retornar o password quando logar.
    const user = await User.findOne({ email }).select('+password')

    // caso não exista o usuário
    if (!user) {
        return res.status(400).send({ error: 'User not found' })
    }

    // compara se a senha digitada é a mesma que está no banco, e como a senha foi criptografado logo
    // preciso usar o bcrypt.
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' })
    }



    // nao mostra o password
    user.password = undefined

    res.send({ user, token: generateToken({ id: user.id }) })

})

module.exports = app => app.use('/auth', router)