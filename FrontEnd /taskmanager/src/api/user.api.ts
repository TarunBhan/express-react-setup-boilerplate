import { doGet, doPost } from ".";

export const userSignup = (formdata: any): Promise<any> => {
  return doPost(
    "/api/users",
    {},
    {
      body: JSON.stringify(formdata),
    }
  );
};
export const userLogin = (formdata: any) => {
  return doPost(
    "api/login",
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    }
  );
};

export const getUsers = async (): Promise<any> => {
  return doGet("https://jsonplaceholder.typicode.com/todos/1", {}, {});
};

export const getUser = async (): Promise<any> => {
  return doGet("/profile", {}, {});
};
