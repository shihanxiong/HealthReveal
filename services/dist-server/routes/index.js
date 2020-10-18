"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// routes/index.js and users.js
var router = _express["default"].Router();

router.get('/', function (req, res, next) {
  res.send('service is alive.');
});
var _default = router;
exports["default"] = _default;