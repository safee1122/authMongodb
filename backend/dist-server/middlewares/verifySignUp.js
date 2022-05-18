"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkDuplicateUsernameOrEmail = function checkDuplicateUsernameOrEmail(req, res, next) {
  // Username
  _user["default"].findOne({
    username: req.body.username
  }).exec(function (err, user) {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }

    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    } // Email


    _user["default"].findOne({
      email: req.body.email
    }).exec(function (err, user) {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }

      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

var verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};
var _default = verifySignUp;
exports["default"] = _default;