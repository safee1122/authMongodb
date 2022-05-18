import authJwt from "../middlewares/authJwt";
import userBoard from "../controllers/user.controller";
import express from "express";
var router = express.Router();

/* GET home page. */
router.post("/", function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
  app.get("/", [authJwt.verifyToken], userBoard);
});

export default router;
