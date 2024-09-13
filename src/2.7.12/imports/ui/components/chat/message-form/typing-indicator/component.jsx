import React, { PureComponent } from 'react';
import {
  defineMessages, injectIntl, FormattedMessage,
} from 'react-intl';
import PropTypes from 'prop-types';
import Styled from './styles';

const propTypes = {
  intl: PropTypes.object.isRequired,
  typingUsers: PropTypes.arrayOf(Object).isRequired,
};

const messages = defineMessages({
  severalPeople: {
    id: 'app.chat.multi.typing',
    description: 'displayed when 4 or more users are typing',
  },
  someoneTyping: {
    id: 'app.chat.someone.typing',
    description: 'label used when one user is typing with disabled name',
  },
});

class TypingIndicator extends PureComponent {
  constructor(props) {
    super(props);

    this.renderTypingElement = this.renderTypingElement.bind(this);
  }

  renderTypingElement() {
    const {
      typingUsers, indicatorEnabled, indicatorShowNames, intl,
    } = this.props;

    if (!indicatorEnabled || !typingUsers) return null;

    const { length } = typingUsers;

    let element = null;

    if (indicatorShowNames) {
      const isSingleTyper = length === 1;
      const isCoupleTyper = length === 2;
      const isMultiTypers = length > 2;

      if (isSingleTyper) {
        const { name } = typingUsers[0];
        element = (
          <FormattedMessage
            id="app.chat.one.typing"
            description="label used when one user is typing"
            values={{
              0: <Styled.SingleTyper>
                {`${name}`}
&nbsp;
              </Styled.SingleTyper>,
            }}
          />
        );
      }

      if (isCoupleTyper) {
        const {name} = typingUsers[0];
        const {name: name2} = typingUsers[1];
        element = (
          <FormattedMessage
            id="app.chat.two.typing"
            description="label used when two users are typing"
            values={{
              0: <Styled.CoupleTyper>
                {`${name}`}
&nbsp;
              </Styled.CoupleTyper>,
              1: <Styled.CoupleTyper>
&nbsp;
                {`${name2}`}
&nbsp;
              </Styled.CoupleTyper>,
            }}
          />
        );
      }

      if (isMultiTypers) {
        element = (
          <span>
            {`${intl.formatMessage(messages.severalPeople)}`}
          </span>
        );
      }
    } else {
      // Show no names in typing indicator
      const isSingleTyper = length === 1;
      const isMultiTypers = length > 1;

      if (isSingleTyper) {
        element = (
          <span>
            {`${intl.formatMessage(messages.someoneTyping)}`}
          </span>
        );
      }

      if (isMultiTypers) {
        element = (
          <span>
            {`${intl.formatMessage(messages.severalPeople)}`}
          </span>
        );
      }
    }

    return element;
  }

  render() {
    const {
      error,
      indicatorEnabled,
    } = this.props;

    const typingElement = indicatorEnabled ? this.renderTypingElement() : null;

    return (
      <Styled.TypingIndicatorWrapper
        error={!!error}
        info={!error}
        spacer={!!typingElement}
      >
        <Styled.TypingIndicator data-test="typingIndicator">{error || typingElement}</Styled.TypingIndicator>
      </Styled.TypingIndicatorWrapper>
    );
  }
}

TypingIndicator.propTypes = propTypes;

export default injectIntl(TypingIndicator);
