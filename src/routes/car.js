"use strict";

const router = require("express").Router();

/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

/* ------------------------------------------------------- */
// routes/car:

const Car = require("../controllers/car");

// URL: /cars

const { isAdmin } = require("../middlewares/permissions");

router.use(isAdmin);

router.route("/").get(Car.list).post(Car.create);

router
  .route("/:id")
  .get(Car.read)
  .put(Car.update)
  .patch(Car.update)
  .delete(Car.delete);

/* ------------------------------------------------------- */
module.exports = router;
