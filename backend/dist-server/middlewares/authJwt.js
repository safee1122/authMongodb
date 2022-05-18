"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _authConfig = require("../config/auth.config.js");

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  (0, _jsonwebtoken.verify)(token, _authConfig.secret, function (err, decoded) {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    req.userId = decoded.id;
    next();
  });
};

var authJwt = {
  verifyToken: verifyToken
};
var _default = authJwt;
exports["default"] = _default;