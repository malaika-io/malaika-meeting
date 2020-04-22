const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
    req.logout();
    //res.redirect(`https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`);
    res.redirect("/login")
});


module.exports = router;
