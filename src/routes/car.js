"use strict";

const router = require("express").Router();

/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

/* ------------------------------------------------------- */
// routes/car:

const Car = require("../controllers/car");

// URL: /cars

const { isAdmin, isLogin ,isStaffOrIsAdmin} = require("../middlewares/permissions");

router.use(isAdmin);

router.route("/").get(Car.list).post(isStaffOrIsAdmin,Car.create);

router
  .route("/:id")
  .get(Car.read)
  .put(isStaffOrIsAdmin,Car.update)
  .patch(isStaffOrIsAdmin,Car.update)
  .delete(isAdmin,Car.delete);

/* ------------------------------------------------------- */
module.exports = router;
