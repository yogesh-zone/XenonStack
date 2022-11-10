const express = require("express");
const adCtrl = require("../Controllers/adcardCtrl");
const upload = require("../Middleware/uploadImage");
const router = express.Router();

router.post("/new", adCtrl.newAd);

router.get("/all", adCtrl.allAds);

module.exports = router;
