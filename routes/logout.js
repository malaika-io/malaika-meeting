const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
    req.logOut();
    res.status(204).end();
});


module.exports = router;
