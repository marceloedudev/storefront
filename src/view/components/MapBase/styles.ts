import styled from 'styled-components';

interface IMapBaseContainer {
  height?: number;
}

export const MapBaseContainer = styled.div<IMapBaseContainer>`
  position: relative;
  width: 100%;
  direction: 'ltr';

  .leaflet-container {
    width: 100%;
    height: calc(${({ height }) => height || 100}vh - 60px);
    min-width: 100px;
    min-height: 100px;
    z-index: 5;
  }
`;
