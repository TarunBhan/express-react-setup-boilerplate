"use client";
import { userLogin } from "@/api/user.api";
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
      const result = await userLogin(inputState);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  const getUserData = async () => {
    try {
      const result = await getUserData();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleInput = (event: any) => {
    if (event.target.type == "email") {
      setInputState((prev) => ({ ...prev, email: event.target.value }));
    } else {
      setInputState((prev) => ({ ...prev, password: event.target.value }));
    }
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
          />
          <Input
            placeHolder="password"
            onChangeCallBack={handleInput}
            type="password"
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
