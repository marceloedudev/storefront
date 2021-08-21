import BackgroundImage from '@assets/background.svg';
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;

  & .layout-content {
    width: 100%;
    max-width: 700px;
    display: flex;
    z-index: 20;
    justify-content: center;
  }

  & .layout-background {
    width: 100%;
    height: 85%;
    position: absolute;

    background-image: url(${BackgroundImage});
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
