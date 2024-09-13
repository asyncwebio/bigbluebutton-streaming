import styled, { css } from 'styled-components';
import {
  smPaddingX,
  mdPaddingX,
  mdPaddingY,
} from '/imports/ui/stylesheets/styled-components/general';
import { ButtonElipsis } from '/imports/ui/stylesheets/styled-components/placeholders';
import { VirtualizedScrollboxVertical } from '/imports/ui/stylesheets/styled-components/scrollable';
import MessageChatItem from '/imports/ui/components/chat/time-window-list/time-window-chat-item/message-chat-item/component';

const UnreadButton = styled(ButtonElipsis)`
  flex-shrink: 0;
  width: 100%;
  text-transform: uppercase;
  margin-bottom: .25rem;
  z-index: 3;
`;

const MessageListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: ${smPaddingX};
  margin-left: calc(-1 * ${mdPaddingX});
  padding-right: ${smPaddingX};
  margin-right: calc(-1 * ${mdPaddingY});
  padding-bottom: ${mdPaddingX};
  z-index: 2;
  [dir="rtl"] & {
    padding-right: ${mdPaddingX};
    margin-right: calc(-1 * ${mdPaddingX});
    padding-left: ${mdPaddingY};
    margin-left: calc(-1 * ${mdPaddingX});
  }
`;

const MessageList = styled(VirtualizedScrollboxVertical)`
  flex-flow: column;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0 auto 0 0;
  right: 0 ${mdPaddingX} 0 0;
  padding-top: 0;
  width: 100%;
  outline-style: none;

  [dir="rtl"] & {
    margin: 0 0 0 auto;
    padding: 0 0 0 ${mdPaddingX};
  }
`;

const Time = styled.time`
`;

const Wrapper = styled.div`
`;

const AvatarWrapper = styled.div`
`;

const Content = styled.div`
`;

const Meta = styled.div`
`;

const Name = styled.div`
`;

const Read = styled.div`
`;

const Messages = styled.div`
`;

const SystemMessageChatItem = styled(MessageChatItem)`
  ${({ messageId }) => messageId ?
    css`
    `
    :
    css`
    `
  }
`;

const Item = styled.div`
`;

const OnlineIndicator = styled.div`
  ${({ isOnline }) => isOnline ?
    css`
      color: red;
    `
    :
    css`
      color: blue;
    `
  }
`;

const ChatItem = styled.div`
`;

const Offline = styled.div`
`;

const PollIcon = styled.div`
`;

const PollMessageChatItem = styled.div`
`;

const StatusMessageChatItem = styled(MessageChatItem)`
`;

export default {
  UnreadButton,
  MessageListWrapper,
  MessageList,
  Time,
  Content,
  Meta,
  Wrapper,
  AvatarWrapper,
  Name,
  Read,
  Messages,
  SystemMessageChatItem,
  Item,
  ChatItem,
  OnlineIndicator,
  Offline,
  PollIcon,
  PollMessageChatItem,
  StatusMessageChatItem,
};

