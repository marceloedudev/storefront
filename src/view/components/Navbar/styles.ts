import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 60px;
  z-index: 15;
  background: #fff;
  left: 0;
  top: 0;
  align-items: center;
  box-shadow: 0 18px 0 -10px hsla(0, 0%, 100%, 0.45),
    0 35px 0 -20px hsla(0, 0%, 100%, 0.3), 10px 30px 45px hsla(0, 0%, 72%, 0.85);

  & .navbar-logout {
    cursor: pointer;
  }
`;

export const NavLink = styled(Link)`
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;
