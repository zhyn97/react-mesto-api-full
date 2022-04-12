export const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000/";

const getJson = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error({ status: response.status });
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(getJson);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(getJson);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU1Y2VjOWYxYmJjYmYyZmYyZWNlZDYiLCJpYXQiOjE2NDk3OTE4NTl9.9okszY3b_pEEwWyc-IkOHJr0NufejOsh47pR3lUuPeM`
    },
  }).then(getJson);
};

