const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require("../controllers/mainController");
const {body} = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware');
const perfilMiddleware = require('../middlewares/perfilMiddleware');


router.get("/index", controller.index);
router.get("/index2", controller.index2);
router.post("/index2",controller.sendTweet);
router.get("/edit", controller.edit);
router.get("/login", controller.login);
router.get("/signup", controller.signup);

module.exports = router;
