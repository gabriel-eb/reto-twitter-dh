const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require("../controllers/mainController");
//const {body} = require('express-validator');
//const guestMiddleware = require('../middlewares/guestMiddleware');
//const perfilMiddleware = require('../middlewares/perfilMiddleware');


router.get("/", controller.index);
router.get("/index2", controller.index2);
router.get("/edit", controller.edit);
router.route("/login").get(controller.login).post(controller.loggear);
router.route("/signup").get(controller.signup).post(controller.registrar);

module.exports = router;
