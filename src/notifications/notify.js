import {createSmsClient} from "./sms";

export const notify = (config) => {
  const url = "https://reservation.pc.gc.ca";

  const sms = createSmsClient(config.sms);

  return async ({name, subscriptions}) => {
    const {phoneNumber} = subscriptions;

    await sms.send(`Hello, a spot has opened up at ${name}. ${url}`, phoneNumber);

    //todo: email
  };
};
