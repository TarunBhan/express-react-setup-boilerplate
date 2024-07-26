import { doGet, doPost } from ".";

export const userLogin = (formdata: any): Promise<any> => {
  return doPost(
    "http://localhost:3001/api/users",
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    }
  );
};

export const getUsers = (): Promise<any> => {
  return doGet("https://jsonplaceholder.typicode.com/todos/1", {}, {});
};
