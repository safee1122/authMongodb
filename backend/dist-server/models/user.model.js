"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _mongoose["default"].model("User", new _mongoose["default"].Schema({
  username: String,
  email: String,
  password: String,
  token: String
}));

var _default = User;
exports["default"] = _default;