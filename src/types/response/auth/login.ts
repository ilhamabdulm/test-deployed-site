export type User = {
  role: string;
  isEmailVerified: boolean;
  name: string;
  email: string;
  id: string;
};

export type Tokens = {
  access: Access;
  refresh: Refresh;
};

export type Access = {
  token: string;
  expires: string;
};

export type Refresh = {
  token: string;
  expires: string;
};

export type LoginResponse = {
  user: User;
  tokens: Tokens;
};
