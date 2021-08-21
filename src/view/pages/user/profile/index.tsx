import React from 'react';
import { currentAccountState } from '@view/atoms';
import { useRecoilValue } from 'recoil';

const Profile: React.FC = () => {
  const accountState: any = useRecoilValue(currentAccountState);

  return (
    <>
      <section>
        {accountState?.user?.first_name} {accountState?.user?.last_name} (
        {accountState?.user?.username})
        <br />
        Email: {accountState?.user?.email}
      </section>
    </>
  );
};

export default Profile;
