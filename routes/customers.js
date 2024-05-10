const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/protect");

const {
  getAllUser,
  createUser,
  confirmByCompany,
  confirmUser,
  checkConfirmation,
  getConfirmUser,
  getUser,
  destroyUser,
  userShareholder,
  updateUser,
  register,
  registerByCommission,
  login,
  forgotPassword,
  resetPassword,
  logout,
  confirmToken,
  renewConfirmToken,
  userCompany,
  destroyVote,
  registerByAdmin,
  activeUsers,
} = require("../controller/customer");

router.route("/logout").get(logout);
router.route("/register").post(register);
router
  .route("/registerByAdmin")
  .post(protect, authorize("0", "1"), registerByAdmin);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/active").get(activeUsers);
// router.route("/active").get(protect, authorize("0", "1"), activeUsers);

router
  .route("/registerbycommission")
  .post(protect, authorize("0", "1"), registerByCommission);

router.route("/confirm").get(confirmToken).post(confirmUser);

router
  .route("/confirmbycompany")
  .post(protect, authorize("0", "1"), confirmByCompany);

router.route("/getconfirm").post(getConfirmUser);

router
  .route("/")
  .get(getAllUser)
  .post(protect, authorize("0", "1"), createUser);

router.route("/companies").get(protect, authorize("0", "1"), userCompany);
router
  .route("/:id")
  .get(protect, getUser)
  .put(protect, authorize("0", "1"), updateUser);
router
  .route("/:id/shareholder")
  .get(protect, authorize("0", "9", "1", "3"), userShareholder);

router
  .route("/checkconfirmation")
  .post(protect, authorize("9"), checkConfirmation);

router
  .route("/deleteuser/:userId/:companyId")
  .delete(protect, authorize("0"), destroyUser);

router
  .route("/vote/:userId/:companyId")
  .delete(protect, authorize("0"), destroyVote);

router.route("/:id/renew-confirm").get(protect, renewConfirmToken);

module.exports = router;
