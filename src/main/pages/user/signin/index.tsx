import React from 'react';
import SignIn from '@view/pages/user/signin';
import TokensUserService from '@data/services/user/tokens-user';
import { fieldValidators } from './validators';

const MakeSignIn: React.FC = () => {
  return (
    <SignIn
      fieldValidators={fieldValidators()}
      tokensService={TokensUserService}
    />
  );
};

export default MakeSignIn;
