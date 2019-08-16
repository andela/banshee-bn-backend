'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.status(200).json('Welcome to Barefoot-Nomad API');
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
    return console.log('Server running on port ' + port);
});

exports.default = app;
//# sourceMappingURL=index.js.map