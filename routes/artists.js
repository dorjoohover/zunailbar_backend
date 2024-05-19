const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/protect");

const {
  getAllEmployee,
  createEmployee,
  getEmployee,
  destroyEmployee,
  updateEmployee,
  createArtist,
  login,
  // logout,
} = require("../controller/artists");
// const LOGfun = () => {
//   console.log("jwt_secret", process.env.JWT_SECRET);
// };

// router.route("/logout").get(logout);
router.route("/createArtist").post(
  // protect, authorize("0"),
  createArtist
);
router.route("/login").post(login);

router.route("/").get(getAllEmployee).post(createEmployee);

router
  .route("/:id")
  .get(protect, getEmployee)
  .delete(protect, destroyEmployee)
  .put(protect, updateEmployee);
// router
//   .route("/:id")
//   .get(protect, getUser)
//   .delete(protect, authorize("0", "1"), destroyUser)
//   .put(protect, authorize("0"), updateUser);

module.exports = router;
