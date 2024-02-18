import { RequestHandler } from "express";
import { EmailChannel, MQTTChannel, PushChannel, SMSChannel, SlackChannel } from "../models/channel.model";
import { Notification } from "../models/notification.model";
import { SmsNotificationDispatcherImplementation } from "../services/notification_dispatcher.service";
import { Result, Success } from "../utils/result.util";
import { SlackNotificationDispatcherImplementation } from "../services/slack_notification_dispatcher_impl.service";
import { EmailNotificationDispatcherImplementation } from "../services/email_notification_dispatcher_impl.service";
import { MqttNotificationDispatcherImplementation } from "../services/mqtt_notification_dispatcher_impl.service";
import { PushNotificationDispatcherImplementation } from "../services/push_notification_dispatcher_impl.service";
export const dispatchNotification: RequestHandler = async (req, res, next) => {
    try {
        let notificationChannel;
        const notification = new Notification('Shashank Daima');
        const notificationChannelData = req.body;
        let result: Result<Boolean> | undefined = undefined;
        switch (notificationChannelData.type) {
            case 'email':
                const emailNotificationDispatcher=new EmailNotificationDispatcherImplementation();
                notificationChannel=new EmailChannel(notificationChannelData.recipients,notificationChannelData.subject, notificationChannelData.body);
                result=await emailNotificationDispatcher.dispatch(notificationChannel, notification);
                break;
            case 'push':
                const pushNotificationDispatcher = new PushNotificationDispatcherImplementation();
                notificationChannel = new PushChannel(notificationChannelData.recipients, notificationChannelData.title, notificationChannelData.body);
                result = await pushNotificationDispatcher.dispatch(notificationChannel, notification);
                break;
            case 'SMS':
                const notificationDispatcher = new SmsNotificationDispatcherImplementation();
                notificationChannel = new SMSChannel( notificationChannelData.recipients, notificationChannelData.message);
                result = await notificationDispatcher.dispatch(notificationChannel, notification);
                break;
            case 'MQTT':
                const mqttNotificationDispatcher = new MqttNotificationDispatcherImplementation();
                notificationChannel = new MQTTChannel(notificationChannelData.topic, notificationChannelData.message);
                result = await mqttNotificationDispatcher.dispatch(notificationChannel, notification);
                break;
            case 'slack':
                const slackNotificationDispatcher = new SlackNotificationDispatcherImplementation();
                notificationChannel = new SlackChannel(notificationChannelData.channel, notificationChannelData.message);
                result = await slackNotificationDispatcher.dispatch(notificationChannel, notification);
                break;
            default:
                throw new Error('Invalid notification channel type');
        }
        
        if (result != undefined && result instanceof Success && result.data) {
            res.status(200).json({ message: 'Notification dispatched successfully' });
        } else {
            res.status(500).json({ message: 'Failed to dispatch notification' });
        }
    }
    catch (error) {
        next(error);
    }
}