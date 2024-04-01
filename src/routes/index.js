"use strict"

const router = require("express").Router();

//auth
router.use("/auth", require("./auth"));
//user
router.use("/users", require("./user"));
//token
router.use("/tokens", require("./token"));

//order
router.use("/cars", require("./car"));
//pizza
// router.use("/reservations", require("./reservation"));

module.exports = router;
