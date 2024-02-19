"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllChannel = exports.SlackChannel = exports.MQTTChannel = exports.SMSChannel = exports.PushChannel = exports.EmailChannel = exports.BaseChannel = void 0;
const uuid_1 = require("uuid");
class BaseChannel {
    constructor() {
        this.id = (0, uuid_1.v4)();
        this.type = '*';
    }
}
exports.BaseChannel = BaseChannel;
class EmailChannel extends BaseChannel {
    constructor(recipients, subject, body) {
        super();
        this.recipients = [];
        this.subject = '';
        this.body = '';
        this.type = 'email';
        this.recipients = recipients;
        this.subject = subject;
        this.body = body;
        this.type = 'email';
    }
}
exports.EmailChannel = EmailChannel;
class PushChannel extends BaseChannel {
    constructor(recipients, title, body) {
        super();
        this.recipients = [];
        this.title = '';
        this.body = '';
        this.type = 'push';
        this.recipients = recipients;
        this.title = title;
        this.body = body;
        this.type = 'push';
    }
}
exports.PushChannel = PushChannel;
class SMSChannel extends BaseChannel {
    constructor(recipients, message) {
        super();
        this.recipients = recipients;
        this.message = message;
        this.type = 'SMS';
    }
}
exports.SMSChannel = SMSChannel;
class MQTTChannel extends BaseChannel {
    constructor(topic, message) {
        super();
        this.topic = '';
        this.message = '';
        this.type = 'MQTT';
        this.topic = topic;
        this.message = message;
        this.type = 'MQTT';
    }
}
exports.MQTTChannel = MQTTChannel;
class SlackChannel extends BaseChannel {
    constructor(channel, message) {
        super();
        this.channel = '';
        this.message = '';
        this.type = 'Slack';
        this.channel = channel;
        this.message = message;
        this.type = 'Slack';
    }
}
exports.SlackChannel = SlackChannel;
// 
class AllChannel extends BaseChannel {
    constructor(email, push, sms, mqtt, slack) {
        super();
        this.type = '*';
        this.emailChannel = email;
        this.pushChannel = push;
        this.smsChannel = sms;
        this.mqttChannel = mqtt;
        this.slackChannel = slack;
    }
}
exports.AllChannel = AllChannel;
