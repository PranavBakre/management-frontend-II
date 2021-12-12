import { initialState } from "./initial-state";

export type Action = (...params: unknown[]) => Promise<void>;

export const restoreAuthState = (_) => {
  const authResponse = JSON.parse(localStorage.getItem("mgmt"));
  const expiry = authResponse.expiry;
  if (new Date(expiry).getTime() > new Date().getTime() + 60 * 1000) {
    return { isLoggedIn: true };
  }
  localStorage.removeItem("mgmt");
  return { isLoggedIn: false };
};

export const login = (_, loginResponse) => {
  localStorage.setItem("mgmt", JSON.stringify(loginResponse));
  return { isLoggedIn: true };
};

export const logout = (_) => {
  localStorage.removeItem("mgmt");
  return {isLoggedIn: false}
}