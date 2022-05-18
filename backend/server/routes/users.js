import express from "express";
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("USER BOARD");
});

export default router;
