"use strict";

const router = require("express").Router();

/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

/* ------------------------------------------------------- */
// routes/car:

const Reservation = require("../controllers/reservation");

// URL: /Reservations

const { isAdmin, isLogin } = require("../middlewares/permissions");

router
  .route("/")
  .get(isLogin, Reservation.list)
  .post(isAdmin, Reservation.create);

router
  .route("/:id")
  .get(isLogin, Reservation.read)
  .put(isAdmin, Reservation.update)
  .patch(isAdmin, Reservation.update)
  .delete(isAdmin, Reservation.delete);

/* ------------------------------------------------------- */
module.exports = router;
