"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _nimbleEmoji = _interopRequireDefault(require("./emoji/nimble-emoji"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var NotFound =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(NotFound, _React$PureComponent);

  function NotFound() {
    (0, _classCallCheck2["default"])(this, NotFound);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(NotFound).apply(this, arguments));
  }

  (0, _createClass2["default"])(NotFound, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          emojiProps = _this$props.emojiProps,
          i18n = _this$props.i18n,
          notFound = _this$props.notFound,
          notFoundEmoji = _this$props.notFoundEmoji;

      var component = notFound && notFound() || _react["default"].createElement("div", {
        className: "emoji-mart-no-results"
      }, (0, _nimbleEmoji["default"])(_objectSpread({
        data: data
      }, emojiProps, {
        size: 38,
        emoji: notFoundEmoji,
        onOver: null,
        onLeave: null,
        onClick: null
      })), _react["default"].createElement("div", {
        className: "emoji-mart-no-results-label"
      }, i18n.notfound));

      return component;
    }
  }]);
  return NotFound;
}(_react["default"].PureComponent);

exports["default"] = NotFound;
NotFound.propTypes
/* remove-proptypes */
= {
  notFound: _propTypes["default"].func.isRequired,
  emojiProps: _propTypes["default"].object.isRequired
};