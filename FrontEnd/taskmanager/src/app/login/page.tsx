"use client";
import { getUsers, userLogin } from "@/api/user.api";
import Input from "@/components/Input/input";
import { useEffect, useState } from "react";

const Login = () => {
  const [inputState, setInputState] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const func = async () => {
    try {
      console.log("call");
      const { token, user } = await userLogin(inputState);
      localStorage.setItem("token", token);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserData = async () => {
    try {
      const result = await getUsers();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    setInputState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          alignSelf: "center",
          flexDirection: "column",
          justifyContent: "center",
          display: "flex",
          width: "40%",
        }}
      >
        <div>
          <p style={{ fontSize: 14, color: "blue", fontWeight: 600 }}>Login</p>
        </div>
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            gap: 10,
          }}
        >
          <Input
            placeHolder="email"
            onChangeCallBack={handleInput}
            type="email"
            name="email"
          />
          <Input
            placeHolder="password"
            onChangeCallBack={handleInput}
            type="password"
            name="password"
          />
          <button
            style={{ borderRadius: 12, border: "1px solid black", height: 30 }}
            onClick={func}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
