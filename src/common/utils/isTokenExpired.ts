import jwtDecode, { JwtPayload } from "jwt-decode";

export const isTokenExpired = (token?: string) => {
  if (!token) return;
  const { exp } = jwtDecode<JwtPayload>(token);
  if (!exp) return;
  return Date.now() < exp * 1000;
};
