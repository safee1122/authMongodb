"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authJwt = _interopRequireDefault(require("./authJwt"));

var _verifySignUp = _interopRequireDefault(require("./verifySignUp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  authJwt: _authJwt["default"],
  verifySignUp: _verifySignUp["default"]
};
exports["default"] = _default;