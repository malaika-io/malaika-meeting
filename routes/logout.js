const express = require('express');
const router = express.Router();

router.delete('/', async function (req, res) {
    req.logout();
    res.status(204).end();
});


module.exports = router;
