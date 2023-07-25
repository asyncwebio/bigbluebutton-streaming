"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _nimbleEmoji = _interopRequireDefault(require("./emoji/nimble-emoji"));

var _skins = _interopRequireDefault(require("./skins"));

var SkinsEmoji =
/*#__PURE__*/
function (_Skins) {
  (0, _inherits2["default"])(SkinsEmoji, _Skins);

  function SkinsEmoji(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SkinsEmoji);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SkinsEmoji).call(this, props));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(SkinsEmoji, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          skin = _this$props.skin,
          emojiProps = _this$props.emojiProps,
          data = _this$props.data,
          skinEmoji = _this$props.skinEmoji,
          i18n = _this$props.i18n;
      var opened = this.state.opened;
      var skinToneNodes = [];

      for (var skinTone = 1; skinTone <= 6; skinTone++) {
        var selected = skinTone === skin;
        skinToneNodes.push(_react["default"].createElement("span", {
          key: "skin-tone-".concat(skinTone),
          className: "emoji-mart-skin-swatch custom".concat(selected ? ' selected' : '')
        }, _react["default"].createElement("span", {
          onClick: this.handleClick,
          "data-skin": skinTone,
          className: "emoji-mart-skin-tone-".concat(skinTone)
        }, (0, _nimbleEmoji["default"])({
          emoji: skinEmoji,
          data: data,
          skin: skinTone,
          backgroundImageFn: emojiProps.backgroundImageFn,
          "native": emojiProps["native"],
          set: emojiProps.set,
          sheetSize: emojiProps.sheetSize,
          size: 23
        }))));
      }

      return _react["default"].createElement("div", {
        className: "emoji-mart-skin-swatches custom".concat(opened ? ' opened' : '')
      }, _react["default"].createElement("div", {
        className: "emoji-mart-skin-text".concat(opened ? ' opened' : '')
      }, i18n.skintext), skinToneNodes);
    }
  }]);
  return SkinsEmoji;
}(_skins["default"]);

exports["default"] = SkinsEmoji;
SkinsEmoji.propTypes
/* remove-proptypes */
= {
  onChange: _propTypes["default"].func,
  skin: _propTypes["default"].number.isRequired,
  emojiProps: _propTypes["default"].object.isRequired,
  skinTone: _propTypes["default"].number,
  skinEmoji: _propTypes["default"].string.isRequired,
  i18n: _propTypes["default"].object
};
SkinsEmoji.defaultProps = {
  onChange: function onChange() {},
  skinTone: null
};