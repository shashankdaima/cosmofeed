import { v4 as uuidv4 } from 'uuid';

export class BaseChannel {
    id: string = uuidv4();
    type: 'email' | 'push' | 'SMS' | 'MQTT' | 'Slack' | '*' = '*';
}

export class EmailChannel extends BaseChannel {
    recipients: string[] = [];
    subject: string = '';
    body: string = '';
    type: 'email' = 'email';

    constructor(recipients: string[], subject: string, body: string) {
        super();
        this.recipients = recipients;
        this.subject = subject;
        this.body = body;
        this.type = 'email';
    }
}
export class PushChannel extends BaseChannel {
    recipients: string[] = [];
    title: string = '';
    body: string = '';
    type: 'push' = 'push';

    constructor(recipients: string[], title: string, body: string) {
        super();
        this.recipients = recipients;
        this.title = title;
        this.body = body;
        this.type = 'push';
    }
}

export class SMSChannel extends BaseChannel {
    recipients: string[];
    message: string;
    type: 'SMS';

    constructor(recipients: string[], message: string) {
        super();
        this.recipients = recipients;
        this.message = message;
        this.type = 'SMS';
    }
}
export class MQTTChannel extends BaseChannel {
    topic: string = '';
    message: string = '';
    type: 'MQTT' = 'MQTT';

    constructor(topic: string, message: string) {
        super();
        this.topic = topic;
        this.message = message;
        this.type = 'MQTT';
    }
}

export class SlackChannel extends BaseChannel {
    channel: string = '';
    message: string = '';
    type: 'Slack' = 'Slack';

    constructor(channel: string, message: string) {
        super();
        this.channel = channel;
        this.message = message;
        this.type = 'Slack';
    }
}

// 
export class AllChannel extends BaseChannel {
    type: '*'='*';
    emailChannel: EmailChannel;
    pushChannel: PushChannel;
    smsChannel: SMSChannel;
    mqttChannel: MQTTChannel;
    slackChannel: SlackChannel;

    constructor(email:EmailChannel,push:PushChannel, sms:SMSChannel, mqtt:MQTTChannel, slack:SlackChannel) {
        super();
        this.emailChannel =email;
        this.pushChannel = push;
        this.smsChannel = sms;
        this.mqttChannel = mqtt;
        this.slackChannel = slack;
    }
}
