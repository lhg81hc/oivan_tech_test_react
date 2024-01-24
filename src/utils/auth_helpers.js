import Cookie from 'js-cookie';

export const isAuthenticated = () => {
  const accessToken = Cookie.get('accessToken');
  return accessToken !== null && accessToken !== undefined;
}
