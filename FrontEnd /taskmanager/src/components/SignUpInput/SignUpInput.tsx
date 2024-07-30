"use client";
import React from "react";
import { useState } from "react";
import Input from "../Input/input";
import { useRouter } from "next/navigation";
import { userSignup } from "@/api/user.api";
import { setCookie } from "@/utils/utils";

const SignInputForm = () => {
  const router = useRouter();
  const [inputState, setInputState] = useState<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const func = async () => {
    try {
      console.log("hye>>>>>");
      const result = await userSignup(inputState);

      setCookie(result?.token);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

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
        flexDirection: "column",
        display: "flex",
        gap: 10,
      }}
    >
      <Input
        placeHolder="FirstName"
        onChangeCallBack={handleInput}
        type="text"
        name="firstName"
      />
      <Input
        placeHolder="LastName"
        onChangeCallBack={handleInput}
        type="text"
        name="lastName"
      />
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
        SignUp
      </button>
    </div>
  );
};

export default SignInputForm;
