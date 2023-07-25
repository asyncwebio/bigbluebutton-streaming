import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import PropTypes from 'prop-types';
import Skins from './skins';
export default class SkinsDot extends Skins {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    // if either enter or space is pressed, then execute
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  render() {
    const {
      skin,
      i18n
    } = this.props;
    const {
      opened
    } = this.state;
    const skinToneNodes = [];

    for (let skinTone = 1; skinTone <= 6; skinTone++) {
      const selected = skinTone === skin;
      const visible = opened || selected;
      skinToneNodes.push(React.createElement("span", _extends({
        key: `skin-tone-${skinTone}`,
        className: `emoji-mart-skin-swatch${selected ? ' selected' : ''}`,
        "aria-label": i18n.skintones[skinTone],
        "aria-hidden": !visible
      }, opened ? {
        role: 'menuitem'
      } : {}), React.createElement("span", _extends({
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
        className: `emoji-mart-skin emoji-mart-skin-tone-${skinTone}`
      }))));
    }

    return React.createElement("section", {
      className: `emoji-mart-skin-swatches${opened ? ' opened' : ''}`,
      "aria-label": i18n.skintext
    }, React.createElement("div", opened ? {
      role: 'menubar'
    } : {}, skinToneNodes));
  }

}
SkinsDot.propTypes
/* remove-proptypes */
= {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
  i18n: PropTypes.object
};
SkinsDot.defaultProps = {
  onChange: () => {}
};