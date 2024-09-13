import styled from 'styled-components';
import {
  borderSize,
  borderSizeLarge,
  borderSizeSmall,
  smPaddingY,
} from '/imports/ui/stylesheets/styled-components/general';
import {
  userThumbnailBorder,
  btnPrimaryBorder,
  btnDefaultColor,
  colorGrayLabel,
  colorGrayLighter,
  colorPrimary,
  colorWhite,
} from '/imports/ui/stylesheets/styled-components/palette';
import { ScrollboxVertical } from '/imports/ui/stylesheets/styled-components/scrollable';
import { fontSizeSmallest } from '/imports/ui/stylesheets/styled-components/typography';
import Button from '/imports/ui/components/common/button/component';

const VirtualBackgroundRowThumbnail = styled.div`
  margin-top: 0.4rem;
`;

const BgWrapper = styled(ScrollboxVertical)`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  margin: ${borderSizeLarge};
  padding: ${borderSizeLarge};

  ${({ isVisualEffects }) => isVisualEffects && `
    height: 15rem;
    flex-wrap: wrap;
    align-content: flex-start;
  `}

  ${({ brightnessEnabled, isVisualEffects }) => brightnessEnabled && isVisualEffects && `
    height: 10rem;
  `}
`;

const BgNoneButton = styled(Button)`
  border-radius: ${borderSizeLarge};
  height: 48px;
  width: 48px;
  border: ${borderSizeSmall} solid ${userThumbnailBorder};
  margin: 0 0.15rem;
  flex-shrink: 0;

  ${({ isVisualEffects }) => isVisualEffects && `
    margin: 0.15rem;
  `}
`;

const ThumbnailButton = styled(Button)`
  outline: none;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: ${borderSizeLarge};
  cursor: pointer;
  height: 48px;
  width: 48px;
  z-index: 1;
  background-color: transparent;
  border: ${borderSizeSmall} solid ${userThumbnailBorder};
  flex-shrink: 0;

  & + img {
    border-radius: ${borderSizeLarge};
  }

  &:focus {
    color: ${btnDefaultColor};
    background-color: transparent;
    background-clip: padding-box;
    box-shadow: 0 0 0 ${borderSize} ${btnPrimaryBorder};
  }

  ${({ disabled }) => disabled && `
    filter: grayscale(1);

    & + img {
      filter: grayscale(1);
    }
  `}

  ${({ background }) => background && `
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    background-origin: padding-box;

    &:active {
      background-image: url(${background});
    }
  `}
`;

const Select = styled.select`
  background-color: ${colorWhite};
  border: ${borderSize} solid ${colorWhite};
  border-radius: ${borderSize};
  border-bottom: 0.1rem solid ${colorGrayLighter};
  color: ${colorGrayLabel};
  width: 100%;
  height: 1.75rem;
  padding: 1px;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 ${borderSizeLarge} ${colorPrimary};
    border-radius: ${borderSize};
  }

  &:hover,
  &:focus {
    outline: transparent;
    outline-style: dotted;
    outline-width: ${borderSize};
  }
`;

const Label = styled.label`
  margin-top: 8px;
  font-size: 0.85rem;
  font-weight: bold;
  color: ${colorGrayLabel};
`;

const ThumbnailButtonWrapper = styled.div`
  position: relative;
  margin: 0 0.15rem;

  ${({ isVisualEffects }) => isVisualEffects && `
    margin: 0.15rem;
  `}
`;

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 2;
  right: 0;
  top: 0;
`;

const ButtonRemove = styled(Button)`
  span {
    font-size: ${fontSizeSmallest};
    padding: ${smPaddingY};
  }
`;

const BgCustomButton = styled(BgNoneButton)``;

const SkeletonWrapper = styled.div`
  flex-basis: 0 0 48px;
  margin: 0 0.15rem;
  height: 48px;

  & .react-loading-skeleton {    
    height: 48px;
    width: 48px;
  }
`;

export default {
  VirtualBackgroundRowThumbnail,
  BgWrapper,
  BgNoneButton,
  ThumbnailButton,
  Select,
  Label,
  ThumbnailButtonWrapper,
  ButtonWrapper,
  ButtonRemove,
  BgCustomButton,
  SkeletonWrapper,
};
