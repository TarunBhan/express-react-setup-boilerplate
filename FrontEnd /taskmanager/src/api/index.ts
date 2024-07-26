"use client";
import ApiException from "./Api.exception";
import fetch from "isomorphic-unfetch";

const doCall = async (
  uri: string,
  params: { [key: string]: any },
  options: { [key: string]: any } = {
    header: {},
  }
) => {
  const {} = params;
  let url = uri;
  const header = {};

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  }).then((res: Response) => {
    if (res.ok === false) {
      return res.json().then((res) => {
        let message;
        message = `Request: ${uri} ${res.statusText}`;
        throw new ApiException(message, res.status, {
          ...res.error,
          status: res.status,
        });
      });
    } else {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== 1) {
        return res.json();
      }
    }
  });
};
/**
 * Used for fetching Http Get method resources
 * @param {string} uri - resource uri
 * @param {Object} params - params need to be replaced with matched params of the uri
 * @return {Promise} - a promise of Response with json data
 */

export const doGet = (
  uri: string,
  params: object = {},
  options?: any
): Promise<any> => {
  return doCall(uri, params, options);
};
export const doPost = (
  uri: string,
  params: object = {},
  options?: any
): Promise<any> => {
  return doCall(uri, params, { ...options, method: "POST" });
};
