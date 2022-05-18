"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _cors = _interopRequireDefault(require("cors"));

var _db = require("./config/db.config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public")));
app.use("/", _index["default"]);
app.use("/users", _users["default"]);
app.use("/api/auth", _auth["default"]);
app.use("/api/test/user", _users["default"]);

var db = require("./models");

db.mongoose.connect("mongodb://".concat(_db.HOST, ":").concat(_db.PORT, "/").concat(_db.DB), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Successfully connect to MongoDB.");
})["catch"](function (err) {
  console.error("Connection error", err);
  process.exit();
});
var _default = app;
exports["default"] = _default;