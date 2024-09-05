"use client";
import { getUser } from "@/api/user.api";
import Header from "@/components/Header/Header";
import { NextApiRequest, NextApiResponse } from "next";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const checkAuthToken = async () => {
    try {
      const result = await getUser();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkAuthToken();
  }, []);
  return (
    <div style={{ background: "white" }}>
      <p style={{ color: "black" }}> </p>
    </div>
  );
}

// export const getServerSideProps = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   let accessToken;
//   try {
//     accessToken = await getAccessToken(
//       req as NextApiRequest,
//       res as NextApiResponse
//     );
//   } catch (e) {
//     console.log(e);
//   }
// };
