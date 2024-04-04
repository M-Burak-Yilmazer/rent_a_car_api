"use strict"

const router = require("express").Router();

//auth
router.use("/auth", require("./auth"));
//user
router.use("/users", require("./user"));
//token
router.use("/tokens", require("./token"));

//cars
router.use("/cars", require("./car"));
//reservations
router.use("/reservations", require("./reservation"));

module.exports = router;
