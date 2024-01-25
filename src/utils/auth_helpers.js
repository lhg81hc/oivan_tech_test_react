import Cookie from 'js-cookie';

export const isAuthenticated = () => {
  const accessToken = getAccessToken();
  return accessToken !== null && accessToken !== undefined;
}

export const getAccessToken = () => {
  return Cookie.get('accessToken');
}

export const setAccessToken = (token) => {
  Cookie.set('accessToken', token);
}
