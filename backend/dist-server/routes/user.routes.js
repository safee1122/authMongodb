"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authJwt = _interopRequireDefault(require("../middlewares/authJwt"));

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/* GET home page. */


router.post("/", function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
  app.get("/", [_authJwt["default"].verifyToken], _user["default"]);
});
var _default = router;
exports["default"] = _default;