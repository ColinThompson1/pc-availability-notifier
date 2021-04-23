# pc-availability-notifier

Automatically check and notify yourself of any Parks Canada campground openings. 

### Setup

1. Configure the twilio sms sid, token and number using the following environment variables.
```
NOTIFICATIONS_SMS_SID
NOTIFICATIONS_SMS_TOKEN
NOTIFICATIONS_SMS_FROM
```

2. Add a search configuration like the following. See parks canada for exhaustive list.
```
{
      name: "Example",
      reservationType: "Backcountry", // Campsite, Backcountry, etc
      park: "Banff,KootenayandYohoBackcountry", // Banff,KootenayandYohoBackcountry, Banff, PacificRim, etc
      pads: 1,
      itinerary: [
        {
          day: "2021-07-04",
          campground: "Big Springs - Br9",
        },
      ],
      subscriptions: {
        email: "example@example.com",
        phoneNumber: "+11111111111",
      },
    },
}
```

2. Start: `npm start`
