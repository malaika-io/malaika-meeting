const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const xss = require('xss');
const {v4: uuidv4} = require('uuid');
const isEmail = require('validator/lib/isEmail');
const normalizeEmail = require('validator/lib/normalizeEmail');

router.post('/', async function (req, res) {
    const {last_name, first_name, password} = req.body;
    const email = normalizeEmail(req.body.email);
    if (!isEmail(email)) {
        res.status(400).send('The email you entered is invalid.');
        return;
    }
    if (!password || !first_name || !last_name || !email) {
        res.status(400).send('Missing field(s)');
        return;
    }
    const user = await models.User.findOne({
        where: {
            email: email
        }
    });
    if (user) {
        return res.status(403).send('The email has already been used.');
    }
    const userInfos = {
        password: bcrypt.hashSync(password, 10),
        last_name: xss(last_name),
        first_name: xss(first_name),
        uuid: uuidv4(),
        email: xss(email)
    };

    try {
        let newUser = await models.User.create(userInfos);
        req.logIn(newUser, (err) => {
            if (err) {
                return res.status(400).send('Une erreur s\'est produite');
            }
            return res.status(201).json({
                user: newUser
            });
        });
    } catch (err) {
        console.log(err)
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).send('Veuillez vérifier le format de votre adresse email');
        }
        return res.status(400).send('Une erreur s\'est produite lors de la création de votre compte');
    }
});


module.exports = router;
