import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import Styled from './styles';
import { uniqueId } from '/imports/utils/string-utils';

const propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  accessKey: PropTypes.string,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
};

const defaultProps = {
  icon: '',
  label: '',
  description: '',
  tabIndex: 0,
  accessKey: null,
  disabled: false,
};

const messages = defineMessages({
  activeAriaLabel: {
    id: 'app.dropdown.list.item.activeLabel',
  },
});

class DropdownListItem extends Component {
  constructor(props) {
    super(props);
    this.labelID = uniqueId('dropdown-item-label-');
    this.descID = uniqueId('dropdown-item-desc-');
  }

  renderDefault() {
    const {
      icon, label, iconRight, accessKey,
    } = this.props;

    return [
      (icon ? <Styled.ItemIcon iconName={icon} key="icon" /> : null),
      (
        <Styled.ItemLabel key="label" accessKey={accessKey}>
          {label}
        </Styled.ItemLabel>
      ),
      (iconRight ? <Styled.IconRight iconName={iconRight} key="iconRight" /> : null),
    ];
  }

  render() {
    const {
      id,
      label,
      description,
      children,
      injectRef,
      tabIndex,
      onClick,
      onKeyDown,
      className,
      style,
      intl,
      disabled,
      'data-test': dataTest,
    } = this.props;

    const isSelected = className && className.includes('emojiSelected');
    const _label = isSelected ? `${label} (${intl.formatMessage(messages.activeAriaLabel)})` : label;
    return (
      <Styled.Item
        id={id}
        ref={injectRef}
        onClick={disabled ? () => {} : onClick}
        onKeyDown={disabled ? () => {} : onKeyDown}
        tabIndex={tabIndex}
        aria-labelledby={this.labelID}
        aria-describedby={this.descID}
        style={style}
        role="menuitem"
        data-test={dataTest}
      >
        {
          children || this.renderDefault()
        }
        {
          label
            ? (<span id={this.labelID} key="labelledby" hidden>{_label}</span>)
            : null
        }
        <span id={this.descID} key="describedby" hidden>{description}</span>
      </Styled.Item>
    );
  }
}

export default injectIntl(DropdownListItem);

DropdownListItem.propTypes = propTypes;
DropdownListItem.defaultProps = defaultProps;
