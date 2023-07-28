import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import NimbleEmoji from './emoji/nimble-emoji';
export default class NotFound extends React.PureComponent {
  render() {
    const {
      data,
      emojiProps,
      i18n,
      notFound,
      notFoundEmoji
    } = this.props;
    const component = notFound && notFound() || React.createElement("div", {
      className: "emoji-mart-no-results"
    }, NimbleEmoji(_objectSpread({
      data: data
    }, emojiProps, {
      size: 38,
      emoji: notFoundEmoji,
      onOver: null,
      onLeave: null,
      onClick: null
    })), React.createElement("div", {
      className: "emoji-mart-no-results-label"
    }, i18n.notfound));
    return component;
  }

}
NotFound.propTypes
/* remove-proptypes */
= {
  notFound: PropTypes.func.isRequired,
  emojiProps: PropTypes.object.isRequired
};