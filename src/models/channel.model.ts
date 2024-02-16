export class BaseChannel {
    id: string = '';
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
    recipients: string[] = [];
    message: string = '';
    type: 'SMS' = 'SMS';
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
    emailChannel: EmailChannel = new EmailChannel();
    pushChannel: PushChannel = new PushChannel();
    smsChannel: SMSChannel = new SMSChannel();
    mqttChannel: MQTTChannel = new MQTTChannel();
    slackChannel: SlackChannel = new SlackChannel();
}


