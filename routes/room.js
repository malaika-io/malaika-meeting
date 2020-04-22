const express = require("express");
const passport = require("passport");
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
}

router.post("/api/rooms", ensureAuthenticated, (req, res) => {

});
