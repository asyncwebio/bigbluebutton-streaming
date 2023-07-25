"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _skins = _interopRequireDefault(require("./skins"));

var SkinsDot =
/*#__PURE__*/
function (_Skins) {
  (0, _inherits2["default"])(SkinsDot, _Skins);

  function SkinsDot(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SkinsDot);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SkinsDot).call(this, props));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(SkinsDot, [{
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      // if either enter or space is pressed, then execute
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.handleClick(event);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          skin = _this$props.skin,
          i18n = _this$props.i18n;
      var opened = this.state.opened;
      var skinToneNodes = [];

      for (var skinTone = 1; skinTone <= 6; skinTone++) {
        var selected = skinTone === skin;
        var visible = opened || selected;
        skinToneNodes.push(_react["default"].createElement("span", (0, _extends2["default"])({
          key: "skin-tone-".concat(skinTone),
          className: "emoji-mart-skin-swatch".concat(selected ? ' selected' : ''),
          "aria-label": i18n.skintones[skinTone],
          "aria-hidden": !visible
        }, opened ? {
          role: 'menuitem'
        } : {}), _react["default"].createElement("span", (0, _extends2["default"])({
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown,
          role: "button"
        }, selected ? {
          'aria-haspopup': true,
          'aria-expanded': !!opened
        } : {}, opened ? {
          'aria-pressed': !!selected
        } : {}, {
          tabIndex: visible ? '0' : '',
          "aria-label": i18n.skintones[skinTone],
          title: i18n.skintones[skinTone],
          "data-skin": skinTone,
          className: "emoji-mart-skin emoji-mart-skin-tone-".concat(skinTone)
        }))));
      }

      return _react["default"].createElement("section", {
        className: "emoji-mart-skin-swatches".concat(opened ? ' opened' : ''),
        "aria-label": i18n.skintext
      }, _react["default"].createElement("div", opened ? {
        role: 'menubar'
      } : {}, skinToneNodes));
    }
  }]);
  return SkinsDot;
}(_skins["default"]);

exports["default"] = SkinsDot;
SkinsDot.propTypes
/* remove-proptypes */
= {
  onChange: _propTypes["default"].func,
  skin: _propTypes["default"].number.isRequired,
  i18n: _propTypes["default"].object
};
SkinsDot.defaultProps = {
  onChange: function onChange() {}
};