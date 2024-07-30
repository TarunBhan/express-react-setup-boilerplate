import { NextApiRequest, NextApiResponse } from "next/types";
import { parse } from "path";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const validateAndUpdateToken = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token);
  console.log(token);
  return decoded;
};

// export const getAccessToken = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   const cookies = parse(req?.headers?.cookie || "");
//   console.log({ cookies });
//   const decodedAuthToken = validateAndUpdateToken(token);
// };
