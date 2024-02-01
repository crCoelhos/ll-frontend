import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    const decoded: { exp?: number } = jwtDecode(token);

    const currentTimestamp = Math.floor(Date.now() / 3600);
    return decoded.exp !== undefined && decoded.exp > currentTimestamp;
  } catch (error) {
    return false;
  }
};
