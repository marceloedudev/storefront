import styled from 'styled-components';

export const LoadingContainer = styled.button`
  align-items: center;
  justify-content: center;
  position: absolute;
  display: flex;
  z-index: 25;
  background-color: white;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: none;

  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load 1.8s infinite ease-in-out;
    animation: load 1.8s infinite ease-in-out;
  }

  .loader {
    color: #7460e6;
    font-size: 10px;
    margin: auto;
    position: relative;
    text-indent: -9999em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    top: 0;
  }

  .loader:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .loader:after {
    left: 3.5em;
  }

  @-webkit-keyframes load {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }

  @keyframes load {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
`;
