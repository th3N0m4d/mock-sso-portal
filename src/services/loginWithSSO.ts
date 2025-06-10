export const loginWithSSO = (provider: string) => {
  window.location.href = `/api/auth/sso?provider=${provider}`;
};
