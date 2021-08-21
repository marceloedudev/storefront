import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  overflow: hidden;

  & .layout-wrapper {
    width: 100%;
    margin-top: 60px;
  }

  & .layout-content {
    overflow: auto;
    max-height: calc(100vh - 60px);
  }
`;
