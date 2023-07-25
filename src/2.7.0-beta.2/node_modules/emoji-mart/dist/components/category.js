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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _frequently = _interopRequireDefault(require("../utils/frequently"));

var _utils = require("../utils");

var _nimbleEmoji = _interopRequireDefault(require("./emoji/nimble-emoji"));

var _notFound = _interopRequireDefault(require("./not-found"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Category =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(Category, _React$Component);

  function Category(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Category);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Category).call(this, props));
    _this.data = props.data;
    _this.setContainerRef = _this.setContainerRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setLabelRef = _this.setLabelRef.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(Category, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.margin = 0;
      this.minMargin = 0;
      this.memoizeSize();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this$props = this.props,
          name = _this$props.name,
          perLine = _this$props.perLine,
          _native = _this$props["native"],
          hasStickyPosition = _this$props.hasStickyPosition,
          emojis = _this$props.emojis,
          emojiProps = _this$props.emojiProps,
          skin = emojiProps.skin,
          size = emojiProps.size,
          set = emojiProps.set,
          nextPerLine = nextProps.perLine,
          nextNative = nextProps["native"],
          nextHasStickyPosition = nextProps.hasStickyPosition,
          nextEmojis = nextProps.emojis,
          nextEmojiProps = nextProps.emojiProps,
          nextSkin = nextEmojiProps.skin,
          nextSize = nextEmojiProps.size,
          nextSet = nextEmojiProps.set,
          shouldUpdate = false;

      if (name == 'Recent' && perLine != nextPerLine) {
        shouldUpdate = true;
      }

      if (name == 'Search') {
        shouldUpdate = !(emojis == nextEmojis);
      }

      if (skin != nextSkin || size != nextSize || _native != nextNative || set != nextSet || hasStickyPosition != nextHasStickyPosition) {
        shouldUpdate = true;
      }

      return shouldUpdate;
    }
  }, {
    key: "memoizeSize",
    value: function memoizeSize() {
      if (!this.container) {
        // probably this is a test environment, e.g. jest
        this.top = 0;
        this.maxMargin = 0;
        return;
      }

      var parent = this.container.parentElement;

      var _this$container$getBo = this.container.getBoundingClientRect(),
          top = _this$container$getBo.top,
          height = _this$container$getBo.height;

      var _parent$getBoundingCl = parent.getBoundingClientRect(),
          parentTop = _parent$getBoundingCl.top;

      var _this$label$getBoundi = this.label.getBoundingClientRect(),
          labelHeight = _this$label$getBoundi.height;

      this.top = top - parentTop + parent.scrollTop;

      if (height == 0) {
        this.maxMargin = 0;
      } else {
        this.maxMargin = height - labelHeight;
      }
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(scrollTop) {
      var margin = scrollTop - this.top;
      margin = margin < this.minMargin ? this.minMargin : margin;
      margin = margin > this.maxMargin ? this.maxMargin : margin;
      if (margin == this.margin) return;

      if (!this.props.hasStickyPosition) {
        this.label.style.top = "".concat(margin, "px");
      }

      this.margin = margin;
      return true;
    }
  }, {
    key: "getEmojis",
    value: function getEmojis() {
      var _this2 = this;

      var _this$props2 = this.props,
          name = _this$props2.name,
          emojis = _this$props2.emojis,
          recent = _this$props2.recent,
          perLine = _this$props2.perLine;

      if (name == 'Recent') {
        var custom = this.props.custom;

        var frequentlyUsed = recent || _frequently["default"].get(perLine);

        if (frequentlyUsed.length) {
          emojis = frequentlyUsed.map(function (id) {
            var emoji = custom.filter(function (e) {
              return e.id === id;
            })[0];

            if (emoji) {
              return emoji;
            }

            return id;
          }).filter(function (id) {
            return !!(0, _utils.getData)(id, null, null, _this2.data);
          });
        }

        if (emojis.length === 0 && frequentlyUsed.length > 0) {
          return null;
        }
      }

      if (emojis) {
        emojis = emojis.slice(0);
      }

      return emojis;
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay(display) {
      var emojis = this.getEmojis();

      if (!emojis || !this.container) {
        return;
      }

      this.container.style.display = display;
    }
  }, {
    key: "setContainerRef",
    value: function setContainerRef(c) {
      this.container = c;
    }
  }, {
    key: "setLabelRef",
    value: function setLabelRef(c) {
      this.label = c;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          id = _this$props3.id,
          name = _this$props3.name,
          hasStickyPosition = _this$props3.hasStickyPosition,
          emojiProps = _this$props3.emojiProps,
          i18n = _this$props3.i18n,
          notFound = _this$props3.notFound,
          notFoundEmoji = _this$props3.notFoundEmoji,
          emojis = this.getEmojis(),
          labelStyles = {},
          labelSpanStyles = {},
          containerStyles = {};

      if (!emojis) {
        containerStyles = {
          display: 'none'
        };
      }

      if (!hasStickyPosition) {
        labelStyles = {
          height: 28
        };
        labelSpanStyles = {
          position: 'absolute'
        };
      }

      var label = i18n.categories[id] || name;
      return _react["default"].createElement("section", {
        ref: this.setContainerRef,
        className: "emoji-mart-category",
        "aria-label": label,
        style: containerStyles
      }, _react["default"].createElement("div", {
        style: labelStyles,
        "data-name": name,
        className: "emoji-mart-category-label"
      }, _react["default"].createElement("span", {
        style: labelSpanStyles,
        ref: this.setLabelRef,
        "aria-hidden": true
        /* already labeled by the section aria-label */

      }, label)), _react["default"].createElement("ul", {
        className: "emoji-mart-category-list"
      }, emojis && emojis.map(function (emoji) {
        return _react["default"].createElement("li", {
          key: emoji.short_names && emoji.short_names.join('_') || emoji
        }, (0, _nimbleEmoji["default"])(_objectSpread({
          emoji: emoji,
          data: _this3.data
        }, emojiProps)));
      })), emojis && !emojis.length && _react["default"].createElement(_notFound["default"], {
        i18n: i18n,
        notFound: notFound,
        notFoundEmoji: notFoundEmoji,
        data: this.data,
        emojiProps: emojiProps
      }));
    }
  }]);
  return Category;
}(_react["default"].Component);

exports["default"] = Category;
Category.propTypes
/* remove-proptypes */
= {
  emojis: _propTypes["default"].array,
  hasStickyPosition: _propTypes["default"].bool,
  name: _propTypes["default"].string.isRequired,
  "native": _propTypes["default"].bool.isRequired,
  perLine: _propTypes["default"].number.isRequired,
  emojiProps: _propTypes["default"].object.isRequired,
  recent: _propTypes["default"].arrayOf(_propTypes["default"].string),
  notFound: _propTypes["default"].func,
  notFoundEmoji: _propTypes["default"].string.isRequired
};
Category.defaultProps = {
  emojis: [],
  hasStickyPosition: true
};