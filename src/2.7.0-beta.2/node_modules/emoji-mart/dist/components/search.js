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

var _svgs = require("../svgs");

var _nimbleEmojiIndex = _interopRequireDefault(require("../utils/emoji-index/nimble-emoji-index"));

var _index = require("../utils/index");

var id = 0;

var Search =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(Search, _React$PureComponent);

  function Search(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Search);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Search).call(this, props));
    _this.state = {
      icon: _svgs.search.search,
      isSearching: false,
      id: ++id
    };
    _this.data = props.data;
    _this.emojiIndex = new _nimbleEmojiIndex["default"](_this.data);
    _this.setRef = _this.setRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.clear = _this.clear.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleKeyUp = _this.handleKeyUp.bind((0, _assertThisInitialized2["default"])(_this)); // throttle keyboard input so that typing isn't delayed

    _this.handleChange = (0, _index.throttleIdleTask)(_this.handleChange.bind((0, _assertThisInitialized2["default"])(_this)));
    return _this;
  }

  (0, _createClass2["default"])(Search, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // in some cases (e.g. preact) the input may already be pre-populated
      // this.input is undefined in Jest tests
      if (this.input && this.input.value) {
        this.search(this.input.value);
      }
    }
  }, {
    key: "search",
    value: function search(value) {
      if (value == '') this.setState({
        icon: _svgs.search.search,
        isSearching: false
      });else this.setState({
        icon: _svgs.search["delete"],
        isSearching: true
      });
      this.props.onSearch(this.emojiIndex.search(value, {
        emojisToShowFilter: this.props.emojisToShowFilter,
        maxResults: this.props.maxResults,
        include: this.props.include,
        exclude: this.props.exclude,
        custom: this.props.custom
      }));
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.input.value == '') return;
      this.input.value = '';
      this.input.focus();
      this.search('');
    }
  }, {
    key: "handleChange",
    value: function handleChange() {
      if (this.input) {
        this.search(this.input.value);
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.clear();
      }
    }
  }, {
    key: "setRef",
    value: function setRef(c) {
      this.input = c;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          i18n = _this$props.i18n,
          autoFocus = _this$props.autoFocus;
      var _this$state = this.state,
          icon = _this$state.icon,
          isSearching = _this$state.isSearching,
          id = _this$state.id;
      var inputId = "emoji-mart-search-".concat(id);
      return _react["default"].createElement("section", {
        className: "emoji-mart-search",
        "aria-label": i18n.search
      }, _react["default"].createElement("input", {
        id: inputId,
        ref: this.setRef,
        type: "search",
        onChange: this.handleChange,
        placeholder: i18n.search,
        autoFocus: autoFocus
      }), _react["default"].createElement("label", {
        className: "emoji-mart-sr-only",
        htmlFor: inputId
      }, i18n.search), _react["default"].createElement("button", {
        className: "emoji-mart-search-icon",
        onClick: this.clear,
        onKeyUp: this.handleKeyUp,
        "aria-label": i18n.clear,
        disabled: !isSearching
      }, icon()));
    }
  }]);
  return Search;
}(_react["default"].PureComponent);

exports["default"] = Search;
Search.propTypes
/* remove-proptypes */
= {
  onSearch: _propTypes["default"].func,
  maxResults: _propTypes["default"].number,
  emojisToShowFilter: _propTypes["default"].func,
  autoFocus: _propTypes["default"].bool
};
Search.defaultProps = {
  onSearch: function onSearch() {},
  maxResults: 75,
  emojisToShowFilter: null,
  autoFocus: false
};