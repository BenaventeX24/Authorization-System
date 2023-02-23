let accessToken = '';
let isAuthenticated = false;

export const setAccessToken = (s: string) => {
  accessToken = s;
};

export const getAccessToken = () => {
  return accessToken as string;
};

export const setAuthentication = (a: boolean) => {
  isAuthenticated = a;
};

export const getAuthentication = () => {
  return isAuthenticated as boolean;
};
