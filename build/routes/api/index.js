"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require("express").Router();

router.use("/", require("./users"));

router.use(function (err, req, res, next) {
    if (err.name === "ValidationError") {
        return res.status(422).json({
            errors: (0, _keys2.default)(err.errors).reduce(function (errors, key) {
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        });
    }

    return next(err);
});

module.exports = router;
//# sourceMappingURL=index.js.map