import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getAllUserController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected route auth for admin
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put('/profile',requireSignIn,updateProfileController);

//order
router.get('/orders',requireSignIn,getOrdersController);

//all order
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController);

//order status update
router.put('/order-status/:orderId',requireSignIn,orderStatusController);
export default router;

//get all the users
router.get("/users", requireSignIn, isAdmin, getAllUserController);