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
}
export class PushChannel extends BaseChannel {
    recipients: string[] = [];
    title: string = '';
    body: string = '';
    type: 'push' = 'push';
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
}

export class SlackChannel extends BaseChannel {
    channel: string = '';
    message: string = '';
    type: 'Slack' = 'Slack';
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

