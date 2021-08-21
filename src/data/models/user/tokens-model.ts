export interface TokensUserRequest {
  grant_type: GrantType;
  username: string;
  password: string;
}

export type GrantType = 'password' | 'refresh_token';

export interface TokensUserResponse {
  user_id: number;
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
}
