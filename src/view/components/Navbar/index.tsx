import { NavLink, NavbarContainer } from './styles';
import React, { memo, useCallback } from 'react';

import { currentAccountState } from '@view/atoms';
import useLogout from '@view/hooks/useLogout';
import { useRecoilValue } from 'recoil';

const Navbar: React.FC = () => {
  const accountState: any = useRecoilValue(currentAccountState);

  const logout = useLogout();

  const onLogoutHandler = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <NavbarContainer>
      <NavLink to="/user/profile">Profile</NavLink>
      <NavLink to="/map">Map</NavLink>
      <div className="navbar-logout" onClick={() => onLogoutHandler()}>
        Logout ({accountState?.user?.username})
      </div>
    </NavbarContainer>
  );
};

export default memo(Navbar);
