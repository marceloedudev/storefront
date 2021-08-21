import { BiHide, BiShow } from 'react-icons/bi';
import { MdEmail, MdLock } from 'react-icons/md';

import { CgSpinner } from 'react-icons/cg';
import styled from 'styled-components';

export const EmailIcon = styled(MdEmail)`
  font-size: 20px;
`;

export const PasswordIcon = styled(MdLock)`
  font-size: 20px;
`;

export const ShowIcon = styled(BiShow)`
  font-size: 20px;
`;

export const HideIcon = styled(BiHide)`
  font-size: 20px;
`;

export const LoadingIcon = styled(CgSpinner)`
  font-size: 20px;
  animation: spin 1s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
