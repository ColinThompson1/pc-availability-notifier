import {CookieJar} from "tough-cookie";
import got from "got";
import map from "lodash/map";

export const createSession = async (config) => {
  const {pc} = config;

  const cookieJar = new CookieJar();
  const withJar = got.extend({cookieJar});

  // configure cookies, redirect etc.
  // home page has a language selection screen
  await withJar(`${pc.url}/Banff`);

  return {
    setReservationInfo: async (info) => {
      const formatted = map(info, (value, key) => `${key}=${value}`).join("&");

      return withJar.post(`${pc.url}/ResInfo.ashx`, {
        body: formatted,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    },
    getAvailability: async (park) => {
      return withJar(`${pc.url}/${park}?Calendar`);
    },
  };
};
