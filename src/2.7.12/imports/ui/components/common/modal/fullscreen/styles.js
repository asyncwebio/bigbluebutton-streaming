import styled from 'styled-components';
import Styled from '../base/component';
import { smallOnly } from '/imports/ui/stylesheets/styled-components/breakpoints';
import Button from '/imports/ui/components/common/button/component';
import {
  borderSize,
  smPaddingX,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  lineHeightComputed,
  headingsFontWeight,
  fontSizeLarger,
} from '/imports/ui/stylesheets/styled-components/typography';
import {
  colorGrayLightest,
  colorText,
} from '/imports/ui/stylesheets/styled-components/palette';

const FullscreenModal = styled(Styled.BaseModal)`
  outline: transparent;
  outline-width: ${borderSize};
  outline-style: solid;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-self: flex-start;
  padding: calc(${lineHeightComputed} / 2) ${lineHeightComputed};

  @media ${smallOnly} {
    width: 100%;
  }
`;

const Header = styled.header`
  display: flex;
  padding: ${lineHeightComputed} 0;
  border-bottom: ${borderSize} solid ${colorGrayLightest};
`;

const Title = styled.h1`
  min-width: 0;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin: 0;
  font-size: ${fontSizeLarger};
  font-weight: ${headingsFontWeight};
`;

const Actions = styled.div`
  flex: 0 1 35%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  color: ${colorText};
  font-weight: normal;
  padding: ${lineHeightComputed} 0;
`;

const DismissButton = styled(Button)`
  flex: 0 1 48%;
`;

const ConfirmButton = styled(Button)`
  flex: 0 1 48%;

  ${({ popout }) => popout === 'popout' && `
    & > i {
      bottom: ${borderSize};
      left: ${smPaddingX};

      [dir="rtl"] & {
        left: -0.5rem;
        transform: rotateY(180deg);
      }
    }
  `}
`;

export default {
  FullscreenModal,
  Header,
  Title,
  Actions,
  Content,
  DismissButton,
  ConfirmButton,
};
