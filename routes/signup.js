const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const xss = require('xss');
const debug = require('../utils/logging');
const {v4: uuidv4} = require('uuid');


const isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users');
    }
    next();
};

router.get('/', async function (req, res) {
    res.render('auth/signup');
});

router.post('/', async function (req, res, next) {
    debug.log.info('register');

    const {email, room, password, last_name} = req.body;
    const userInfos = {
        password: bcrypt.hashSync(password, 10),
        organization: xss(room),
        last_name: xss(last_name),
        uuid: uuidv4(),
        email: xss(email)
    };

    return execute()
        .then((user) => {
            if (user) {
                console.log(user)
                return req.logIn(user, (err) => {
                    if (err) {
                        return res.render("signup", {errors: new Error("Une erreur est survenue. Essayez d\'actualiser cette page")});
                    }
                    res.redirect(`/users/${user.uuid}`);
                })
            } else {
                return res.render("auth/signup", {errors: errors.array()});
            }
        }).catch((err) => {
            next(err);
        });

    async function execute() {
        try {
            const new_user = await models.sequelize.transaction(async function (t) {
                let newUser = await models.User.create(userInfos, {transaction: t});
                let newRomm = await models.Room.create({name: room}, {transaction: t});
                await newUser.addRoom(newRomm, {transaction: t});
                return newUser
            });
            await new_user.reload({include: [models.Room]});
            return new_user;
        } catch (err) {
            console.log(err)
            if (err.name === 'SequelizeUniqueConstraintError') {
                throw new Error("Cette adresse email est déjà utilisée.");
            }
            if (err.name === 'SequelizeValidationError') {
                throw new Error("Veuillez vérifier le format de votre adresse email");
            }
            throw new Error("Une erreur s\'est produite lors de la création de votre compte");
        }
    }
});


module.exports = router;
