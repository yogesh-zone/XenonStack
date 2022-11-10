const express = require("express");
const userCtrl = require("../Controllers/userCtrl");
const router = express.Router();

router.post("/register", userCtrl.register);

router.post("/login", userCtrl.login);

router.get("/logout", userCtrl.logout);

module.exports = router;
