import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiUrl, { email, password });
  localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt.token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const exportedObject = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default exportedObject;
