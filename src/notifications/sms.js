import isArray from "lodash/isArray";
import map from "lodash/map";
import twilio from "twilio";

export const createSmsClient = (config) => {
  const {sid, token, from} = config;

  const {messages} = twilio(sid, token);

  return {
    send: async (msg, to) => {
      if (!isArray(to)) {
        to = [to];
      }

      await Promise.all(
        map(to, (num) => messages.create({body: msg, to: num, from}))
      );
    },
  };
};
