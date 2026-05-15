import type { ApiResponse } from '@/types';

export interface LoginParamsType {
  username: string;
  password: string;
}

export type CurrentUserInfo = {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
};

export type AuthInfoResponseData = {
  userInfo: CurrentUserInfo;
  roles: string[];
  menus: unknown[];
  permissions: string[];
};

export type LoginResponseType = ApiResponse<{
  access_token: string;
  expires_in: number;
}>;
