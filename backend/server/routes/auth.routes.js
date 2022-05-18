import verifySignUp from "../middlewares/verifySignUp";
import { signup, signin } from "../controllers/auth.controller";
import express from "express";
var router = express.Router();

/* GET home page. */
router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail],
  signup,
  function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  }
);
router.post("/signin", signin, function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

export default router;
