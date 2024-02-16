export class BaseChannel {
    id: string = '';
    type: 'email' | 'push' | 'SMS' | 'MQTT' | 'Slack' | '*' = '*';
}

export class EmailChannel extends BaseChannel {
    recipients: string[] = [];
    subject: string = '';
    body: string = '';
}

export class PushChannel extends BaseChannel {
    recipients: string[] = [];
    title: string = '';
    body: string = '';
}

export class SMSChannel extends BaseChannel {
    recipients: string[] = [];
    message: string = '';
}

export class MQTTChannel extends BaseChannel {
    topic: string = '';
    message: string = '';
}

export class SlackChannel extends BaseChannel {
    channel: string = '';
    message: string = '';
}

// 
export class AllChannel extends BaseChannel {
    emailChannel: EmailChannel = new EmailChannel();
    pushChannel: PushChannel = new PushChannel();
    smsChannel: SMSChannel = new SMSChannel();
    mqttChannel: MQTTChannel = new MQTTChannel();
    slackChannel: SlackChannel = new SlackChannel();
}


