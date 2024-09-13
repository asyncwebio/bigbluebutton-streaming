import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import KEY_CODES from '/imports/utils/keyCodes';
import Styled from './styles';
import ListItem from './item/component';
import ListSeparator from './separator/component';
import ListTitle from './title/component';

const propTypes = {
  /*  We should recheck this proptype, sometimes we need to create an container and send to
   dropdown, but with this proptype, is not possible. */
  children: PropTypes.arrayOf((propValue, key, componentName, propFullName) => {
    if (propValue[key].type !== ListItem
      && propValue[key].type !== ListSeparator
      && propValue[key].type !== ListTitle) {
      return new Error(`Invalid prop \`${propFullName}\` supplied to`
        + ` \`${componentName}\`. Validation failed.`);
    }
    return true;
  }).isRequired,

  horizontal: PropTypes.bool,
};

const defaultProps = {
  horizontal: false,
};

export default class DropdownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedIndex: false,
    };

    this.childrenRefs = [];
    this.menuRefs = [];
    this.handleItemKeyDown = this.handleItemKeyDown.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    this._menu.addEventListener('keydown', (event) => this.handleItemKeyDown(event));
  }

  componentDidUpdate() {
    const { focusedIndex } = this.state;
    const children = [].slice.call(this._menu.children);
    this.menuRefs = children.filter((child) => child.getAttribute('role') === 'menuitem');

    const activeRef = this.menuRefs[focusedIndex];

    if (activeRef) {
      activeRef.focus();
    }
  }

  handleItemKeyDown(event, callback) {
    const {
      getDropdownMenuParent,
      horizontal,
    } = this.props;
    const { focusedIndex } = this.state;

    let nextFocusedIndex = focusedIndex > 0 ? focusedIndex : 0;

    if (focusedIndex === false) {
      nextFocusedIndex = this.menuRefs.indexOf(document.activeElement);
    }

    const isHorizontal = horizontal;
    const navigationKeys = {
      previous: KEY_CODES[`ARROW_${isHorizontal ? 'LEFT' : 'UP'}`],
      next: KEY_CODES[`ARROW_${isHorizontal ? 'RIGHT' : 'DOWN'}`],
      click: isHorizontal ? [KEY_CODES.ENTER] : [KEY_CODES.ENTER, KEY_CODES.ARROW_RIGHT],
      close: [KEY_CODES.ESCAPE,
        KEY_CODES.TAB,
        KEY_CODES[`ARROW_${isHorizontal ? 'DOWN' : 'LEFT'}`]],
    };

    if (navigationKeys.previous === event.which) {
      event.stopPropagation();

      nextFocusedIndex -= 1;

      if (nextFocusedIndex < 0) {
        nextFocusedIndex = this.menuRefs.length - 1;
      } else if (nextFocusedIndex > this.menuRefs.length - 1) {
        nextFocusedIndex = 0;
      }
    }

    if ([navigationKeys.next].includes(event.keyCode)) {
      event.stopPropagation();

      nextFocusedIndex += 1;

      if (nextFocusedIndex > this.menuRefs.length - 1) {
        nextFocusedIndex = 0;
      }
    }

    if (navigationKeys.click.includes(event.keyCode)) {
      nextFocusedIndex = false;
      event.stopPropagation();
      document.activeElement.firstChild.click();
    }

    if (navigationKeys.close.includes(event.keyCode)) {
      nextFocusedIndex = false;
      const { dropdownHide } = this.props;

      event.stopPropagation();
      event.preventDefault();

      dropdownHide();
      if (getDropdownMenuParent) {
        getDropdownMenuParent().focus();
      }
    }

    this.setState({ focusedIndex: nextFocusedIndex });

    if (typeof callback === 'function') {
      callback(event);
    }
  }

  handleItemClick(event, callback) {
    const {
      getDropdownMenuParent,
      onActionsHide,
      dropdownHide,
      keepOpen,
    } = this.props;

    if (!keepOpen) {
      if (getDropdownMenuParent) {
        onActionsHide();
      } else {
        this.setState({ focusedIndex: null });
        dropdownHide();
      }
    }

    if (typeof callback === 'function') {
      callback(event);
    }
  }

  render() {
    const {
      children,
      style,
      horizontal,
    } = this.props;

    const boundChildren = Children.map(
      children,
      (item) => {
        if (item.type === ListSeparator) {
          return item;
        }

        return cloneElement(item, {
          tabIndex: 0,
          injectRef: (ref) => {
            if (ref && !this.childrenRefs.includes(ref)) { this.childrenRefs.push(ref); }
          },

          onClick: (event) => {
            let { onClick } = item.props;
            onClick = onClick ? onClick.bind(item) : null;
            this.handleItemClick(event, onClick);
          },

          onKeyDown: (event) => {
            let { onKeyDown } = item.props;
            onKeyDown = onKeyDown ? onKeyDown.bind(item) : null;

            this.handleItemKeyDown(event, onKeyDown);
          },
        });
      },
    );

    const listDirection = horizontal ? 'horizontal' : 'vertical';

    return (
      <Styled.List
        style={style}
        direction={listDirection}
        role="menu"
        ref={(menu) => {
          this._menu = menu;
          return menu;
        }}
      >
        {boundChildren}
      </Styled.List>
    );
  }
}

DropdownList.propTypes = propTypes;
DropdownList.defaultProps = defaultProps;
