const express = require('express');
const router = express.Router();
const passport = require("passport");

const isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users');
    }
    next();
};

router.get('/', async function (req, res) {
    res.redirect("/");
});

router.post('/', async function (req, res) {

    const {email, password} = req.body;
    passport.authenticate("local",  (err, user) => {
        if (err) return next(err);
        if (!user) return res.redirect("/login");
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.redirect("/");
        });
    })(req, res, next);

});

module.exports = router;
