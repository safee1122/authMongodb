"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.signin = void 0;

var _auth = require("../config/auth.config");

var _user = _interopRequireDefault(require("../models/user.model"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signup = function signup(req, res) {
  console.log(req.body);
  var user = new _user["default"]({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function (err, user) {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }

    res.send({
      message: "User was registered successfully!"
    });
  });
};

exports.signup = signup;

var signin = function signin(req, res) {
  console.log(req.body);

  _user["default"].findOne({
    username: req.body.username
  }).exec(function (err, user) {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }

    if (!user) {
      return res.status(404).send({
        message: "User Not found."
      });
    }

    var passwordIsValid = req.body.password === user.password;

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = _jsonwebtoken["default"].sign({
      id: user.id
    }, _auth.secret, {
      expiresIn: 86400 // 24 hours

    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token
    });
  });
};

exports.signin = signin;