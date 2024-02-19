# Scalable MultiChannel Notification System


This is a scalable MultiChannel Notification System that sends notifications to SMS, EMail, Push Notification, Slack, and MQTT. This is a hiring assignment for a Senior Software Engineer at Cosmofeed. The system is built with Express.js and TypeScript.
> **Note:** The MQTT functionality is currently not working. We are actively working on fixing this issue. Thank you for your understanding.

![Current System Design](images/current_system_design.png)

![System Design with Message Queues](images/system_design.png)

## Tech Stack
- Express.js
- Supabase
- Firebase (for FCM)
- Google OAuth (for email with Nodemailer)
- Slack API
- BullMQ


## Future Improvements
- Fix the MQTT pipeline to enable MQTT functionality.
- Add a message queue for better scalability and reliability.
- Maybe usage of Kubernetes for orchestration

## API Curl Definition
```bash
curl --location 'https://cosmofeed-trial.onrender.com/notification/dispatch' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "*",
    "message":"Testing Notification 2",
    "emailChannel": {
        "type": "email",
        "body": "Helloworld",
        "subject": "Email Notification Service:2",
        "recipients": [
            "shashank19106@iiitd.ac.in",
            "shashankdaima@proton.me"
        ]
    },
    "pushChannel": {
        "type": "push",
        "recipients": [
            "fadrugxlQMOcgKTjbv88ej:APA91bG3cHS_bSDC_FAAnrgJCEGZC1f-STwv6lBAfL7ba-UFVZQNR3kRIQOsTVjdZGLEbFw1poQn0Q9ogvvf7VzT_UBOOzI1hauvurb57JMOM8cyZi22tv1MRayPDbFUOCmyIil5V2Np"
        ],
        "title": "Push Notification Service:2",
        "body": "Helloworld"
    },
    "smsChannel": {
        "type": "SMS",
        "recipients": [
            "+91<phone number>"
        ],
        "message": "SMS Notification Service:2"
    },
    "mqttChannel": {
        "type": "MQTT",
        "topic": "Mqtt Notification Service:2",
        "message": "Helloworld"
    },
    "slackChannel": {
        "type": "slack",
        "channel": "#testing",
        "message": "Slack Notification Service:2"
    }
}'
```
## Individual Platform Integration Info.
Because most of the platform have some sort of authentication, it's a important step to setup individual channels apart from SDK's(and library keys). If you have correct keys as enviroment variables.
- Push notification: Download apk given this project, it has integration with FCM, click on "Copy Token", it will copy fcm token to your clipboard, then add that to recipents. Thanks to Philipp Lackner's tutorial on FCM. I just took his app with my google_services.json. 
- Slack Notifications: There is a bot(I named it "Cosmofeed Slack Bot") you need to include that bot in your project. 
- Email: Nothing. It will work by default. 
- Phone number nothing. It will work. 
- MQTT not working as of now. 


## System Overview
The system is designed to handle a large number of notifications across multiple channels. It is built with scalability and reliability in mind. The current implementation supports SMS, EMail, Push Notification, and Slack. The MQTT functionality is a work in progress. Each individual notification service has its own messaging queue, allowing us to increase or decrease the number of workers as per the load of the message queue.
## What's Next?
The first priority is to fix the MQTT pipeline and enable MQTT functionality. This will allow the system to support real-time messaging over MQTT. Additionally, the system can be further improved by adding a message queue. This will ensure that no notifications are lost, even during high traffic periods.

## Thank You
Thank you for considering this assignment. I look forward to discussing the system in more detail.

