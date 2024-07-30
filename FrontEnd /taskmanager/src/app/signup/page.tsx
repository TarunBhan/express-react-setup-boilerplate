"use client";
import SignInputForm from "@/components/SignUpInput/SignUpInput";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const Singup = () => {
  const getUserData = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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
          <p style={{ fontSize: 14, color: "#1f87ff", fontWeight: 600 }}>
            Singup
          </p>
        </div>
        <SignInputForm />
      </div>
    </div>
  );
};
export default Singup;

// export const getServerSideProps = ({ req, res, query }) => {
//   let errorCode = null;
// };
