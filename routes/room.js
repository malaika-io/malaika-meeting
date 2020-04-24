const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/', async function (req, res) {
    try {
        const user = await models.User.findByPk(req.user.id, {
            include: [models.Room]
        });
        res.json(user.Rooms);
    } catch (e) {
        console.log(e)
    }
});

router.post('/', async function (req, res) {
    const {name} = req.body;
    try {
        await models.Room.create({
            name: name
        })
    } catch (e) {

    }

});


module.exports = router;
