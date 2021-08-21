import React, { useEffect } from 'react';

import { currentAccountState } from '@view/atoms';
import { useRecoilValue } from 'recoil';

const DashboardHome: React.FC = () => {
  const accountState = useRecoilValue(currentAccountState);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('>> accountState: ', accountState);
  }, [accountState]);

  return <div>DashboardHome</div>;
};

export default DashboardHome;
