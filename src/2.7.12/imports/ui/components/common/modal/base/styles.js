import styled from 'styled-components';
import { ModalScrollboxVertical } from '/imports/ui/stylesheets/styled-components/scrollable';
import { borderRadius } from '/imports/ui/stylesheets/styled-components/general';
import { smallOnly, mediumUp } from '/imports/ui/stylesheets/styled-components/breakpoints';
import { colorWhite } from '/imports/ui/stylesheets/styled-components/palette';

const BaseModal = styled(ModalScrollboxVertical)`
  max-width: 60vw;
  max-height: 100%;
  border-radius: ${borderRadius};
  background: ${colorWhite};
  overflow: auto;

  @media ${smallOnly} {
    max-width: 95vw;
  }

  @media ${mediumUp} {
    max-width: 80vw;
  }
`;

export default {
  BaseModal,
};
