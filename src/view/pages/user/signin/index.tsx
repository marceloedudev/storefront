import { SignInProvider, useSignIn } from './contexts/useSignIn';

import { EmailIcon } from '@resources/icons';
import Input from './components/Input';
import { Link } from 'react-router-dom';
import PasswordInput from './components/PasswordInput';
import React from 'react';
import { SignInContainer } from './styles';
import SubmitButton from './components/SubmitButton';
import TokensUser from '@data/services/user/tokens-user/tokens-user';
import useFormSignIn from './hooks/useFormSignIn';

type ISignIn = {
  fieldValidators: any;
  tokensService: TokensUser;
};

const MakeSignIn: React.FC<ISignIn> = ({ fieldValidators, tokensService }) => {
  const { state } = useSignIn();

  const { onSubmit } = useFormSignIn({ fieldValidators, tokensService });

  return (
    <>
      <SignInContainer>
        <div className="signin-content">
          <form onSubmit={onSubmit}>
            <h6>Login to System</h6>

            <Input
              name="email"
              type="email"
              label="Email"
              inputProps={{
                icon: <EmailIcon />,
              }}
              helperText={state.errors.email?.message}
              autoComplete="on"
            />

            <PasswordInput
              name="password"
              label="Password"
              helperText={state.errors.password?.message}
            />

            <div className="signin-container-desc">
              Don't have an account?<Link to="/signup">Register here</Link>
            </div>

            <div className="signin-container-button">
              <SubmitButton label="Log In" />
            </div>
          </form>
        </div>
      </SignInContainer>
    </>
  );
};

const SignIn = (props) => (
  <SignInProvider>
    <MakeSignIn {...props} />
  </SignInProvider>
);

export default SignIn;
