import store from 'store';

export function getToken(): string {
  return store.get('loginInfo')?.accessToken;
}
