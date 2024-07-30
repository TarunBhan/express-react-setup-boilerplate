export const getHeader = () => {
  const headers: {
    [key: string]: string;
  } = {
    "content-type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers["x-auth-token"] = token;
    //   "x-auth-token": token,
    //   ...headers,
  }
  console.log(headers);
  return headers;
};

export const setLocalStorage = (authToken: string) => {
  localStorage.setItem("token", authToken);
};

export const setCookie = (authToken: string) => {
  console.log("authToken:", authToken);
  document.cookie = `token=${authToken[0]}`;
  document.cookie = `refreshToken=${authToken[1]}`;
};

export const CheckTokenExpiry = () => {};
